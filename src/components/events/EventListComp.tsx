import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getEventTypeListApi, deleteEventTypeApi } from "../../api/eventapi";
import { EventType } from "../../types/event.types";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
// Icons
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "../../icons";

type EventListCompProps = {
    refreshTrigger: number;
    onEdit: (event: EventType) => void;
};

const EventListComp = ({ refreshTrigger, onEdit }: EventListCompProps) => {
    const [events, setEvents] = useState<EventType[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<"all" | "event" | "eventMeet">("all");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await getEventTypeListApi();
            setEvents(res.data);
            setFilteredEvents(res.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch event types");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [refreshTrigger]);

    // Handle Search and Filter
    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = events.filter((event) => {
            const matchesSearch = event.eventType.toLowerCase().includes(query);
            const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
        setFilteredEvents(filtered);
        setCurrentPage(1); // Reset to first page on search/filter
    }, [searchQuery, categoryFilter, events]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        setDeletingId(id);
        try {
            await deleteEventTypeApi(id);
            toast.success("Event type deleted successfully");
            fetchEvents(); // Refresh list
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to delete event type");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading && events.length === 0) {
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
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Event List
                </h2>
                {/* Search Bar */}
                {/* Search Bar & Filter */}
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
                    {/* Filter Buttons */}
                    <div className="flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            onClick={() => setCategoryFilter("all")}
                            className={`rounded-l-lg border px-4 py-2 text-sm font-medium ${categoryFilter === "all"
                                ? "bg-brand-500 text-white border-brand-500"
                                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-brand-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                                }`}
                        >
                            All
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategoryFilter("event")}
                            className={`border-t border-b px-4 py-2 text-sm font-medium ${categoryFilter === "event"
                                ? "bg-brand-500 text-white border-brand-500 z-10"
                                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-brand-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                                }`}
                        >
                            Event
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategoryFilter("eventMeet")}
                            className={`rounded-r-lg border px-4 py-2 text-sm font-medium ${categoryFilter === "eventMeet"
                                ? "bg-brand-500 text-white border-brand-500"
                                : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-brand-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600"
                                }`}
                        >
                            Event Meet
                        </button>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand-500 dark:focus:ring-brand-500"
                        />
                    </div>
                </div>
            </div>

            {filteredEvents.length === 0 ? (
                <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    {searchQuery ? "No events found matching your search." : "No events found. Add your first event type!"}
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
                                        Event Type
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Category
                                    </TableCell>
                                    <TableCell isHeader className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                {paginatedEvents.map((event, index) => (
                                    <TableRow key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                            {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {event.eventType}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {event.category
                                                ? event.category.toLocaleUpperCase()
                                                : "-"}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm">
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => onEdit(event)}
                                                    disabled={deletingId === event._id}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(event._id, event.eventType)}
                                                    disabled={deletingId === event._id}
                                                >
                                                    {deletingId === event._id ? "Deleting..." : "Delete"}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <Button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    Previous
                                </Button>
                                <Button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    variant="outline"
                                    size="sm"
                                >
                                    Next
                                </Button>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)}</span> of <span className="font-medium">{filteredEvents.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 dark:ring-gray-600 dark:hover:bg-gray-700"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        {/* Simple page numbers could go here, for now just Next/Prev arrows */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 dark:ring-gray-600 dark:hover:bg-gray-700"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EventListComp;
