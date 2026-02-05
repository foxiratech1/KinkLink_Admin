
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getRejectUsersApi, updateUserRegiStatusApi } from "../../api/usersapi";
import { User } from "../../types/user.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import Pagination from "../ui/pagination/Pagination";

type TabType = "All" | "Person" | "Business";

const RejectUsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    // Fetch Reject users
    const fetchRejectUsers = async () => {
        setLoading(true);
        try {
            const response = await getRejectUsersApi({
                page: currentPage,
                limit,
                search: searchQuery,
                role: activeTab === "All" ? undefined : activeTab,
            });


            setUsers((response as any).data || []);
            setTotalUsers((response as any).data?.length || 0);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch reject users");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchRejectUsers();
    }, [currentPage, searchQuery, activeTab]);

    // Update filteredUsers when users change
    // useEffect(() => {
    //     let result = [...users];

    //     //  SEARCH FILTER
    //     if (searchQuery.trim()) {
    //         const q = searchQuery.toLowerCase();

    //         result = result.filter((user) => {
    //             return (
    //                 user.email?.toLowerCase().includes(q) ||
    //                 user.username?.toLowerCase().includes(q) ||
    //                 user.name?.toLowerCase().includes(q) ||
    //                 user.businessProfile?.businessName?.toLowerCase().includes(q)
    //             );
    //         });
    //     }

    //     //  TAB FILTER
    //     if (activeTab !== "All") {
    //         result = result.filter((user) => user.role === activeTab);
    //     }

    //     setUsers(result);
    // }, [users, activeTab, searchQuery]);

    // Handle approve
    const handleApprove = async (userId: string) => {
        setActionLoading(userId);
        try {
            await updateUserRegiStatusApi(userId, "Approve");
            toast.success("User approved successfully");
            fetchRejectUsers(); // Refresh the list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to approve user");
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
                                    setCurrentPage(1);
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
                ) : users.length === 0 ? (
                    <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                        No Reject users found
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
                                {users.map((user) => (
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
                                                : user.status === "Reject"
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
                                                {/* Show Approve button if status is Reject OR Rejected */}
                                                {(user.status === "Reject") && (
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
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* PAGINATION */}
                {!loading && users.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalItems={totalUsers}
                        itemsPerPage={limit}
                    />
                )}
            </div>
        </div>
    );
};

export default RejectUsersComponent;
