import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getBlockedUsersApi, updateUserBlockStatus } from "../../api/usersapi";
import { User } from "../../types/user.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";

type TabType = "All" | "Person" | "Business";
const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/`;

const getProfileImage = (user: User): string | null => {
    const img =
        user.role === "Business"
            ? user.businessProfile?.profileImg
            : user.personProfile?.profileImg;

    if (!img || img.trim() === "") return null;
    return img;
};


const BlockedUsersComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    // Fetch users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getBlockedUsersApi({
                page: currentPage,
                limit,
                search: searchQuery,
            });
            setUsers(response.users);
            setTotalUsers(response.totalUsers);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchQuery]);

    // Filter users based on active tab
    useEffect(() => {
        if (activeTab === "All") {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter((user) => user.role === activeTab));
        }
    }, [users, activeTab]);

    // Handle block/unblock
    const handleBlockToggle = async (userId: string, isBlocked: boolean) => {
        try {
            const newBlockStatus = !isBlocked;

            await updateUserBlockStatus(userId, newBlockStatus);

            toast.success(
                newBlockStatus
                    ? "User blocked successfully"
                    : "User unblocked successfully"
            );

            fetchUsers(); // refresh list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Action failed");
        }

    };

    // Navigate to user details
    const handleUserClick = (userId: string) => {
        navigate(`/users/details/${userId}`);
    };

    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div className="space-y-6">
            {/* TABLE BOX */}
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">

                {/* TABS */}
                <div className="border-b border-gray-200 px-6 pt-4 dark:border-gray-700">
                    <div className="flex gap-4">
                        {(["All", "Person", "Business"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
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
                        No users found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Profile
                                    </TableCell>

                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Email
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Name
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Role
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Registration
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Status
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Online
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Created
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-xs font-medium uppercase">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUsers.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        onClick={() => handleUserClick(user._id)}
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <img
                                                src={
                                                    getProfileImage(user)
                                                        ? `${IMAGE_BASE_URL}${getProfileImage(user)}`
                                                        : "/images/avatar-placeholder.png"
                                                }
                                                alt="profile"
                                                className="h-9 w-9 rounded-full object-cover border"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        "/images/avatar-placeholder.png";
                                                }}
                                            />
                                        </TableCell>


                                        <TableCell className="px-6 py-4 text-sm">{user.email}</TableCell>
                                        {/* <TableCell className="px-6 py-4 text-sm">
                                            {user.name || user.username || "-"}
                                        </TableCell> */}
                                        <TableCell className="px-6 py-4 text-sm">
                                            {user.role === "Business"
                                                ? user.businessProfile?.businessName || "-"
                                                : user.name || user.username || "-"}
                                        </TableCell>

                                        <TableCell className="px-6 py-4 text-sm">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${user.role === "Person"
                                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-gray-500">
                                            {user.registrationRole || "-"}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${user.status === "Approve"
                                                    ? "bg-green-100 text-green-800"
                                                    : user.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span
                                                className={`inline-block h-2 w-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"
                                                    }`}
                                            />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Button
                                                size="sm"
                                                variant={user.isBlocked ? "primary" : "outline"}
                                                onClick={(e) => {
                                                    e?.stopPropagation();
                                                    handleBlockToggle(user._id, user.isBlocked);
                                                }}
                                            >
                                                {user.isBlocked ? "Unblock" : "Block"}
                                            </Button>
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

export default BlockedUsersComponent;
