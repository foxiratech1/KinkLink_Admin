import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getPendingUsersApi, updateUserRegiStatusApi } from "../../api/usersapi";
import { User } from "../../types/user.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";

const PendingUsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const navigate = useNavigate();
    // Fetch pending users
    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const response = await getPendingUsersApi();
            setUsers(response.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch pending users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

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

    return (
        <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            {/* HEADER INSIDE BOX */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Pending Users ({users.length})
                </h2>
                <Button variant="outline" size="sm" onClick={fetchPendingUsers}>
                    Refresh
                </Button>
            </div>

            {/* CONTENT */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                </div>
            ) : users.length === 0 ? (
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

                                    {/* <TableCell className="px-6 py-4">
                                        <div className="flex gap-2">
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
                                        </div>
                                    </TableCell> */}
                                    <TableCell className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {/* Show Approve button if status is Pending OR Rejected */}
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

                                            {/* Show Reject button ONLY if status is Pending */}
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
        </div>

    );
};

export default PendingUsersComponent;
