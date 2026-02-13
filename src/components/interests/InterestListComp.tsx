import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInterestListApi, deleteInterestApi } from "../../api/interestapi";
import { Interest } from "../../types/interest.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import Pagination from "../ui/pagination/Pagination";

type InterestListCompProps = {
    refreshTrigger: number;
    onEdit: (interest: Interest) => void;
};

const InterestListComp = ({ refreshTrigger, onEdit }: InterestListCompProps) => {
    const [interests, setInterests] = useState<Interest[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalInterests, setTotalInterests] = useState(0);
    const ITEMS_PER_PAGE = 10;

    const fetchInterests = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getInterestListApi({
                page: currentPage,
                limit: ITEMS_PER_PAGE,
            });

            if ("data" in data && Array.isArray(data.data)) {
                setInterests(data.data);

                if ("total" in data && typeof data.total === "number") {
                    setTotalInterests(data.total);
                } else {
                    setTotalInterests(data.data.length);
                }
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch interests");
        } finally {
            setLoading(false);
        }
    }, [currentPage, ITEMS_PER_PAGE]);

    useEffect(() => {
        fetchInterests();
    }, [fetchInterests, refreshTrigger]);


    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        setDeletingId(id);
        try {
            await deleteInterestApi(id);
            toast.success("Interest deleted successfully");
            fetchInterests(); // Refresh list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete interest");
        } finally {
            setDeletingId(null);
        }
    };

    const totalPages = Math.ceil(totalInterests / ITEMS_PER_PAGE);

    if (loading && interests.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Interest List
            </h2>

            {interests.length === 0 && !loading ? (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No interests found. Add your first interest!
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50 dark:bg-gray-800">
                                <TableRow>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        #
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Interest Name
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Created At
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {interests.map((interest, index) => (
                                    <TableRow key={interest._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                            {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {interest.interestName}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {interest.createdAt
                                                ? new Date(interest.createdAt).toLocaleDateString()
                                                : "-"}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => onEdit(interest)}
                                                    disabled={deletingId === interest._id}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(interest._id, interest.interestName)}
                                                    disabled={deletingId === interest._id}
                                                >
                                                    {deletingId === interest._id ? "Deleting..." : "Delete"}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {!loading && totalInterests > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            totalItems={totalInterests}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default InterestListComp;
