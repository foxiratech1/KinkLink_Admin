import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getUserVerificationsApi } from "../../api/usersapi";
import { VerificationUser } from "../../types/user.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Pagination from "../ui/pagination/Pagination";

const IMAGE_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/`;

const getVerificationImage = (user: VerificationUser): string | null => {
    if (user.liveSelfieVerification?.image) return user.liveSelfieVerification.image;
    if (typeof user.selfieImage === "string") return user.selfieImage;
    if (user.selfieImage?.image) return user.selfieImage.image;
    return null;
};


interface UserVerificationListProps {
    status?: "Approved" | "Rejected" | "Pending" | "Verification Requested" | "Verification Suspended" | "Not Verified" | "Under Review";
}

const UserVerificationList = ({ status }: UserVerificationListProps) => {
    const [users, setUsers] = useState<VerificationUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    // Fetch users
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getUserVerificationsApi({
                page: currentPage,
                limit,
                search: searchQuery,
                status: status,
            });

            if (response.success) {
                setUsers(response.data);
                setTotalCount(response.totalCount);
                setTotalPages(response.pagination.totalPages);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch verification requests");
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchQuery, status]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Navigate to user details (reusing existing user details page for now)
    const handleUserClick = (userId: string) => {
        navigate(`/users/details/${userId}`);
    };

    return (
        <div className="space-y-6">
            {/* SEARCH BAR */}
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <input
                    type="text"
                    placeholder="Search by email, name..."
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
                    No {status?.toLowerCase() || "verification"} requests found
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Profile
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Type
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Registration
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Submitted
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-6 py-3 text-xs font-medium uppercase"
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((item) => (
                                <TableRow
                                    key={item._id}
                                    onClick={() => handleUserClick(item.user._id)}
                                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <TableCell className="px-6 py-4">
                                        <img
                                            src={
                                                getVerificationImage(item)
                                                    ? `${IMAGE_BASE_URL}${getVerificationImage(item)}`
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
                                    <TableCell className="px-6 py-4 text-sm">
                                        {item.user.name || "-"}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm">
                                        {item.user.email}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.user.role === "Person"
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                            }`}>{item.user.role || "-"}</span>

                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                                        {item.user.registrationRole || "-"}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-gray-500">
                                        {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "-"}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${item.overallStatus === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : item.overallStatus === "Under Review"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {item.overallStatus === "Approved"
                                                ? "Verified"
                                                : item.overallStatus === "Rejected"
                                                    ? "Unverified"
                                                    : item.overallStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm">
                                        <button className="text-brand-600 hover:text-brand-800 font-medium">
                                            View Details
                                        </button>
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
                    totalItems={totalCount}
                    itemsPerPage={limit}
                />
            )}
        </div>
    );
};

export default UserVerificationList;
