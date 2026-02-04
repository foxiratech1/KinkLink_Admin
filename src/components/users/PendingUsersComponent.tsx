
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getPendingUsersApi, updateUserRegiStatusApi } from "../../api/usersapi";
import { User } from "../../types/user.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";

type TabType = "All" | "Person" | "Business";

const PendingUsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    // Fetch pending users
    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const response = await getPendingUsersApi({
                page: currentPage,
                limit,
                search: searchQuery,
                role: activeTab === "All" ? undefined : activeTab,
            });
            setUsers((response as any).data || []);
            setTotalUsers(response.totalUsers || 0);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch pending users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, [currentPage, searchQuery, activeTab]);

    // Update filteredUsers when users change
    // Since we filter server-side, this just mirrors users to keep structure consistent
    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    // Handle approve
    const handleApprove = async (userId: string) => {
        setActionLoading(userId);
        try {
            await updateUserRegiStatusApi(userId, "Approve");
            toast.success("User approved successfully");
            fetchPendingUsers(); // Refresh the list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to approve user");
        } finally {
            setActionLoading(null);
        }
    };

    // Handle reject
    const handleReject = async (userId: string) => {
        setActionLoading(userId);
        try {
            await updateUserRegiStatusApi(userId, "Reject");
            toast.success("User rejected successfully");
            fetchPendingUsers(); // Refresh the list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to reject user");
        } finally {
            setActionLoading(null);
        }
    };

    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                {/* TABS */}
                <div className="border-b border-gray-200 px-6 pt-4 dark:border-gray-700">
                    <div className="flex gap-4">
                        {(["All", "Person", "Business"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setCurrentPage(1); // Reset to page 1 on tab change
                                }}
                                className={`px-4 py-2 font-medium transition-colors ${activeTab === tab
                                    ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
                                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                    }`}
                            >
                                {tab} Users
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEARCH BAR */}
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Search by email, name, or username..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                        No pending users found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Email
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Name
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Role
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Created At
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-700 dark:text-gray-300">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUsers.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        onClick={() => navigate(`/users/details/${user._id}`)}
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <TableCell className="px-6 py-4 text-sm">
                                            {user.email}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm">
                                            {user.name || user.businessName || "-"}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm">
                                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.role === "Person"
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm">
                                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.status === "Approve"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                : user.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                }`}>
                                                {user.status}
                                            </span>
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {(user.status === "Pending" || user.status === "Reject") && (
                                                    <Button
                                                        size="sm"
                                                        variant="primary"
                                                        onClick={(e) => {
                                                            e?.stopPropagation();
                                                            handleApprove(user._id);
                                                        }}
                                                        disabled={actionLoading === user._id}
                                                    >
                                                        {actionLoading === user._id ? "..." : "Approve"}
                                                    </Button>
                                                )}

                                                {user.status === "Pending" && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => {
                                                            e?.stopPropagation();
                                                            handleReject(user._id);
                                                        }}
                                                        disabled={actionLoading === user._id}
                                                        className="text-red-600 hover:bg-red-50"
                                                    >
                                                        {actionLoading === user._id ? "..." : "Reject"}
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* PAGINATION */}
                {!loading && filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing {(currentPage - 1) * limit + 1} to{" "}
                            {Math.min(currentPage * limit, totalUsers)} of {totalUsers}
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingUsersComponent;
