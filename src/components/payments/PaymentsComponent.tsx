import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "../ui/table";
import Pagination from "../ui/pagination/Pagination";
import Avatar from "../ui/avatar/Avatar";
import DatePicker from "../form/date-picker";
import { Modal } from "../ui/modal";
import {
  IoSearchOutline,
  IoChevronDownOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoCloseOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoSendOutline,
  IoDocumentTextOutline,
  IoCardOutline,
  IoRefreshOutline,
  IoCopyOutline,
  IoCreateOutline
} from "react-icons/io5";
import { Payment, RefundRequest } from "../../types/payment.types";
import {
  getPaymentsApi,
  getRefundRequestsApi,
  updateRefundRequestApi,
  replyToUserByEmailApi,
  simulateSubmitRefundRequestApi
} from "../../api/paymentapi";

type TabType = "transactions" | "refunds";

export default function PaymentsComponent() {
  const [activeTab, setActiveTab] = useState<TabType>("transactions");
  const [loading, setLoading] = useState(false);

  // Payments History States
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Completed" | "Failed">("All");
  const [methodFilter, setMethodFilter] = useState<"All" | "Visa" | "PayPal" | "Apple Pay" | "Google Pay">("All");
  const [itemTypeFilter, setItemTypeFilter] = useState<"All" | "Premium" | "Sticker Pack">("All");
  const [dateOption, setDateOption] = useState<"All" | "Today" | "Last 7 days" | "Last 30 days" | "Custom">("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPayPage, setCurrentPayPage] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalPayPages, setTotalPayPages] = useState(1);
  const payLimit = 8;

  // Payments Drawer State
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Refund Tickets States
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<RefundRequest | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [internalNoteInput, setInternalNoteInput] = useState("");
  const [emailReplyInput, setEmailReplyInput] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Simulation Tool States
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [simUserId, setSimUserId] = useState("usr_999");
  const [simUsername, setSimUsername] = useState("kinky_tester");
  const [simEmail, setSimEmail] = useState("tester@kinklink.app");
  const [simSubId, setSimSubId] = useState("sub_test999");
  const [simPayId, setSimPayId] = useState("ch_stripe_9999");
  const [simReason, setSimReason] = useState<RefundRequest["reason"]>("Billing issue");
  const [simMessage, setSimMessage] = useState("");

  /* ===================== FETCH DATA FUNCTIONS ===================== */

  const fetchPayments = useCallback(async () => {
    if (activeTab !== "transactions") return;
    setLoading(true);
    try {
      const response = await getPaymentsApi({
        page: currentPayPage,
        limit: payLimit,
        search: searchQuery,
        status: statusFilter,
        paymentMethod: methodFilter,
        itemType: itemTypeFilter,
        dateFilter: dateOption,
        startDate: dateOption === "Custom" ? startDate : undefined,
        endDate: dateOption === "Custom" ? endDate : undefined
      });
      if (response.success) {
        setPayments(response.data);
        setTotalPayments(response.totalCount);
        setTotalPayPages(response.totalPages);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to load payments history");
    } finally {
      setLoading(false);
    }
  }, [currentPayPage, searchQuery, statusFilter, methodFilter, itemTypeFilter, dateOption, startDate, endDate, activeTab]);

  const fetchRefundRequests = useCallback(async () => {
    if (activeTab !== "refunds") return;
    setLoading(true);
    try {
      const response = await getRefundRequestsApi();
      if (response.success) {
        setRefundRequests(response.data);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to load refund requests");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "transactions") {
      fetchPayments();
    } else {
      fetchRefundRequests();
    }
  }, [activeTab, fetchPayments, fetchRefundRequests]);

  /* ===================== HANDLERS ===================== */

  // Copy Provider Reference Helper
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Trigger Payments Sidebar Drawer
  const handleRowClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDrawerOpen(true);
  };

  // Trigger Ticket Details Modal
  const handleTicketClick = (ticket: RefundRequest) => {
    setSelectedTicket(ticket);
    setInternalNoteInput(ticket.internalNotes || "");
    setEmailReplyInput("");
    setIsTicketModalOpen(true);
  };

  // Submit Internal Notes
  const handleSaveNotes = async () => {
    if (!selectedTicket) return;
    setIsSavingNotes(true);
    try {
      const updated = await updateRefundRequestApi(selectedTicket._id, {
        internalNotes: internalNoteInput
      });
      setSelectedTicket(updated);
      toast.success("Internal notes updated successfully!");
      fetchRefundRequests();
    } catch (err: any) {
      toast.error(err.message || "Failed to update notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Submit Email Reply
  const handleSendEmailReply = async () => {
    if (!selectedTicket || !emailReplyInput.trim()) return;
    setIsSendingEmail(true);
    try {
      const updated = await replyToUserByEmailApi(selectedTicket._id, emailReplyInput);
      setSelectedTicket(updated);
      setEmailReplyInput("");
      toast.success(`Email reply successfully queued and sent to ${updated.user.email}!`);
      fetchRefundRequests();
    } catch (err: any) {
      toast.error(err.message || "Failed to send email");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Change Ticket Status
  const handleChangeTicketStatus = async (newStatus: RefundRequest["status"]) => {
    if (!selectedTicket) return;
    try {
      const updated = await updateRefundRequestApi(selectedTicket._id, {
        status: newStatus
      });
      setSelectedTicket(updated);
      toast.success(`Ticket status marked as ${newStatus}`);
      fetchRefundRequests();
    } catch (err: any) {
      toast.error(err.message || "Failed to update ticket status");
    }
  };

  // Submit simulated user submission
  const handleSimulateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simUserId || !simUsername || !simEmail || !simSubId || !simPayId) {
      toast.error("Please fill in all simulation fields.");
      return;
    }

    try {
      await simulateSubmitRefundRequestApi({
        userId: simUserId,
        username: simUsername,
        email: simEmail,
        subscriptionId: simSubId,
        paymentId: simPayId,
        reason: simReason,
        message: simMessage || undefined
      });
      toast.success("Simulation ticket successfully submitted! Check the Refunds tab.");
      setIsSimModalOpen(false);
      // Reset simulator
      setSimMessage("");
      setSimPayId(`ch_stripe_${Math.floor(Math.random() * 100000)}`);
      // Refresh current list
      fetchRefundRequests();
      fetchPayments();
    } catch (err: any) {
      toast.error("Failed to simulate submission");
    }
  };

  // Styling helpers
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
      case "Approved":
      case "Refunded":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900";
      case "Failed":
      case "Declined":
        return "bg-error-50 text-error-700 border border-error-200 dark:bg-error-950/30 dark:text-error-400 dark:border-error-900";
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900";
      case "Closed":
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  return (
    <div className="p-1 sm:p-4 md:p-8 bg-[#F8FAFC] dark:bg-gray-950 min-h-screen font-sans transition-colors duration-200">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Payments & Billing Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track user subscriptions, analyze transaction history, and resolve refund requests.
          </p>
        </div>

        {/* Top Buttons (Simulator & Refresh) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-full shadow-md text-sm font-semibold transition-all duration-200"
          >
            <IoCreateOutline className="text-lg" />
            Simulate Contact Us Submission
          </button>

          <button
            onClick={() => {
              if (activeTab === "transactions") fetchPayments();
              else fetchRefundRequests();
              toast.success("Data reloaded");
            }}
            className="p-2.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full shadow-sm transition-all"
            title="Refresh Data"
          >
            <IoRefreshOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Main Tab selector */}
      <div className="flex bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-1 mb-8 w-fit overflow-hidden">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-8 py-3 rounded-xl transition-all text-sm font-semibold ${activeTab === "transactions"
              ? "bg-brand-500 text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          Payments History
        </button>
        <button
          onClick={() => setActiveTab("refunds")}
          className={`px-8 py-3 rounded-xl transition-all text-sm font-semibold ${activeTab === "refunds"
              ? "bg-brand-500 text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
        >
          Billing & Refund Tickets
        </button>
      </div>

      {/* ==========================================
         TAB 1: PAYMENTS HISTORY
         ========================================== */}
      {activeTab === "transactions" && (
        <div className="space-y-6">

          {/* Filters Bar */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Filters & Search
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

              {/* Search */}
              <div className="relative">
                <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Username, transaction ID..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPayPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                />
              </div>

              {/* Date Filter Dropdown */}
              <div className="relative">
                <select
                  value={dateOption}
                  onChange={(e) => {
                    setDateOption(e.target.value as any);
                    setCurrentPayPage(1);
                  }}
                  className="w-full pl-3 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-700 dark:text-gray-200 appearance-none cursor-pointer"
                >
                  <option value="All">All Time</option>
                  <option value="Today">Today</option>
                  <option value="Last 7 days">Last 7 Days</option>
                  <option value="Last 30 days">Last 30 Days</option>
                  <option value="Custom">Custom Date Range</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <IoCalendarOutline />
                </div>
              </div>

              {/* Item Type Filter */}
              <div className="relative">
                <select
                  value={itemTypeFilter}
                  onChange={(e) => {
                    setItemTypeFilter(e.target.value as any);
                    setCurrentPayPage(1);
                  }}
                  className="w-full pl-3 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-700 dark:text-gray-200 appearance-none cursor-pointer"
                >
                  <option value="All">All Items</option>
                  <option value="Premium">Premium Subscriptions</option>
                  <option value="Sticker Pack">Sticker Packs</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <IoChevronDownOutline />
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as any);
                    setCurrentPayPage(1);
                  }}
                  className="w-full pl-3 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-700 dark:text-gray-200 appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <IoChevronDownOutline />
                </div>
              </div>

              {/* Payment Method */}
              <div className="relative">
                <select
                  value={methodFilter}
                  onChange={(e) => {
                    setMethodFilter(e.target.value as any);
                    setCurrentPayPage(1);
                  }}
                  className="w-full pl-3 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-700 dark:text-gray-200 appearance-none cursor-pointer"
                >
                  <option value="All">All Methods</option>
                  <option value="Visa">Visa</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Apple Pay">Apple Pay</option>
                  <option value="Google Pay">Google Pay</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <IoChevronDownOutline />
                </div>
              </div>

            </div>

            {/* Custom Date Inputs (Appears only when 'Custom' is selected) */}
            {dateOption === "Custom" && (
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700/50 animate-fadeIn">
                <div className="flex-1">
                  <DatePicker
                    id="startDatePicker"
                    placeholder="YYYY-MM-DD"
                    label="Start Date"
                    onChange={(selectedDates) => {
                      if (selectedDates && selectedDates[0]) {
                        const formatted = new Date(selectedDates[0]).toISOString().split("T")[0];
                        setStartDate(formatted);
                        setCurrentPayPage(1);
                      }
                    }}
                  />
                </div>
                <div className="flex-1">
                  <DatePicker
                    id="endDatePicker"
                    placeholder="YYYY-MM-DD"
                    label="End Date"
                    onChange={(selectedDates) => {
                      if (selectedDates && selectedDates[0]) {
                        const formatted = new Date(selectedDates[0]).toISOString().split("T")[0];
                        setEndDate(formatted);
                        setCurrentPayPage(1);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Payments Table Container */}
          <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden pb-4 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-32 space-y-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                <span className="italic text-gray-400 dark:text-gray-500 text-sm">Loading transactions...</span>
              </div>
            ) : payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-full mb-4">
                  <IoCardOutline className="text-5xl text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Payments Found
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto mt-1">
                  Try adjusting your search criteria, category filters, or selecting a different date range.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                    <TableRow className="hover:bg-transparent">
                      <TableCell isHeader className="px-6 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        User
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Date & Time
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Item Purchased
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Amount
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Status
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Payment Method
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Transaction ID
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.map((p) => (
                      <TableRow
                        key={p._id}
                        onClick={() => handleRowClick(p)}
                        className="cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        {/* User */}
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={p.user.profileImg ? `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/${p.user.profileImg}` : null}
                              name={p.user.username}
                              size="small"
                            />
                            <div>
                              <div className="text-gray-800 dark:text-white font-semibold text-sm">
                                @{p.user.username}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                {p.user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Date */}
                        <TableCell className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {new Date(p.dateTime).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                        </TableCell>

                        {/* Item */}
                        <TableCell className="px-4 py-4">
                          <span className="flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-white">
                            <IoBookOutline className="text-gray-400 text-base" />
                            {p.item}
                          </span>
                        </TableCell>

                        {/* Amount */}
                        <TableCell className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-white">
                          ${p.amount.toFixed(2)}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusStyles(p.status)}`}>
                            {p.status}
                          </span>
                        </TableCell>

                        {/* Method */}
                        <TableCell className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {p.paymentMethod}
                        </TableCell>

                        {/* Txn ID */}
                        <TableCell className="px-4 py-4 text-sm font-mono text-gray-400 dark:text-gray-500">
                          {p.transactionId}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {!loading && payments.length > 0 && (
              <div className="mt-6 px-6">
                <Pagination
                  currentPage={currentPayPage}
                  totalPages={totalPayPages}
                  onPageChange={setCurrentPayPage}
                  totalItems={totalPayments}
                  itemsPerPage={payLimit}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
         TAB 2: BILLING & REFUND TICKETS
         ========================================== */}
      {activeTab === "refunds" && (
        <div className="space-y-6">


          <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden pb-4 min-h-[400px]">

            {loading ? (
              <div className="flex flex-col justify-center items-center py-32 space-y-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
                <span className="italic text-gray-400 dark:text-gray-500 text-sm">Loading tickets...</span>
              </div>
            ) : refundRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-full mb-4">
                  <IoMailOutline className="text-5xl text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Refund Tickets
                </h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mx-auto mt-1">
                  There are currently no billing issue or refund ticket submissions from users.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                    <TableRow className="hover:bg-transparent">
                      <TableCell isHeader className="px-6 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Ticket User
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Submission Date
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Reason Code
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        User Message Summary
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Status
                      </TableCell>
                      <TableCell isHeader className="px-4 py-5 text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Admin Note
                      </TableCell>
                      <TableCell isHeader className="px-6 py-5 text-center text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-wider">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {refundRequests.map((req) => (
                      <TableRow
                        key={req._id}
                        onClick={() => handleTicketClick(req)}
                        className="cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        {/* User */}
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={req.user.profileImg ? `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/${req.user.profileImg}` : null}
                              name={req.user.username}
                              size="small"
                            />
                            <div>
                              <div className="text-gray-800 dark:text-white font-semibold text-sm">
                                @{req.user.username}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                {req.user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Submitted Date */}
                        <TableCell className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {new Date(req.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                        </TableCell>

                        {/* Reason */}
                        <TableCell className="px-4 py-4 text-sm font-semibold text-gray-800 dark:text-white">
                          {req.reason}
                        </TableCell>

                        {/* Message Trim */}
                        <TableCell className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                          {req.message || <span className="italic text-gray-300">No message provided</span>}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusStyles(req.status)}`}>
                            {req.status}
                          </span>
                        </TableCell>

                        {/* Notes snippet */}
                        <TableCell className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate">
                          {req.internalNotes || <span className="italic text-gray-300">None</span>}
                        </TableCell>

                        {/* Actions button */}
                        <TableCell className="px-6 py-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTicketClick(req);
                            }}
                            className="px-4 py-1.5 border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white dark:hover:text-black rounded-lg text-xs font-semibold transition-all duration-150"
                          >
                            Resolve
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
         PAYMENT SIDEBAR DETAILS DRAWER (SLIDE OVER)
         ========================================== */}
      <div
        className={`fixed inset-0 overflow-hidden z-99998 transition-opacity duration-300 ease-in-out ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gray-500/30 dark:bg-black/50 backdrop-blur-[6px] transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        ></div>

        <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {selectedPayment && (
              <div className="h-full flex flex-col justify-between">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <IoDocumentTextOutline className="text-xl text-brand-500" />
                    Payment Details
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white"
                  >
                    <IoCloseOutline className="text-2xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Status header card */}
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                    <span className="text-xs text-gray-400 dark:text-gray-500 block uppercase font-bold tracking-widest mb-1">
                      Transaction Amount
                    </span>
                    <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                      ${selectedPayment.amount.toFixed(2)}
                    </h3>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusStyles(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      User Information
                    </h4>

                    <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/20 rounded-xl">
                      <Avatar
                        src={selectedPayment.user.profileImg ? `${import.meta.env.VITE_API_BASE_URL}/uploads/profileImage/${selectedPayment.user.profileImg}` : null}
                        name={selectedPayment.user.username}
                        size="medium"
                      />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">
                          @{selectedPayment.user.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {selectedPayment.user.email}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                          ID: {selectedPayment.user._id}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 pt-3">
                      Payment Properties
                    </h4>

                    <div className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                      <div className="py-3 flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Purchased Item</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{selectedPayment.item}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Date & Time</span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {new Date(selectedPayment.dateTime).toLocaleString()}
                        </span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Payment Gateway</span>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{selectedPayment.paymentMethod}</span>
                      </div>
                      <div className="py-3 flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Transaction ID</span>
                        <span className="font-mono text-xs text-gray-800 dark:text-gray-200">{selectedPayment.transactionId}</span>
                      </div>

                      {/* PAYMENT PROVIDER REFERENCE */}
                      <div className="py-3 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 dark:text-gray-400">Payment Provider Ref</span>
                          <button
                            onClick={() => handleCopyText(selectedPayment.paymentProviderReference)}
                            className="text-brand-500 hover:text-brand-600 flex items-center gap-1 text-xs font-semibold"
                          >
                            <IoCopyOutline /> Copy
                          </button>
                        </div>
                        <span className="font-mono text-xs text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                          {selectedPayment.paymentProviderReference}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => {
                      // Check if a refund ticket exists for this payment, or open simulator
                      setSimUserId(selectedPayment.user._id);
                      setSimUsername(selectedPayment.user.username);
                      setSimEmail(selectedPayment.user.email);
                      setSimPayId(selectedPayment.paymentProviderReference);
                      setIsSimModalOpen(true);
                      setIsDrawerOpen(false);
                      toast.success("Loaded user details into simulator!");
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-semibold transition-all"
                  >
                    <IoCreateOutline className="text-lg" />
                    Simulate Refund Request for this User
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
         REFUND TICKET DETAIL & ACTION MODAL
         ========================================== */}
      {selectedTicket && (
        <Modal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          className="max-w-4xl"
        >
          <div className="p-6 md:p-8 space-y-6">

            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 dark:border-gray-800 pb-4 gap-4 mt-4">
              <div>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                  REFUND TICKET ID: {selectedTicket._id}
                </span>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 mt-1">
                  Billing Issue for @{selectedTicket.user.username}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight ${getStatusStyles(selectedTicket.status)}`}>
                  Status: {selectedTicket.status}
                </span>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left Column - Ticket Info */}
              <div className="lg:col-span-6 space-y-6">

                {/* Details Card */}
                <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Ticket Details
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-3">
                      <span className="text-gray-500 dark:text-gray-400">User ID:</span>
                      <span className="col-span-2 font-mono text-xs text-gray-800 dark:text-gray-200 select-all">
                        {selectedTicket.userId}
                      </span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-500 dark:text-gray-400">Subscription ID:</span>
                      <span className="col-span-2 font-mono text-xs text-gray-800 dark:text-gray-200 select-all">
                        {selectedTicket.subscriptionId}
                      </span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-500 dark:text-gray-400">Payment ID:</span>
                      <span className="col-span-2 font-mono text-xs text-gray-800 dark:text-gray-200 flex items-center gap-1">
                        <span className="truncate select-all max-w-[120px]">{selectedTicket.paymentId}</span>
                        <button
                          onClick={() => handleCopyText(selectedTicket.paymentId)}
                          className="text-brand-500 text-xs hover:underline animate-pulse"
                        >
                          Copy
                        </button>
                      </span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-500 dark:text-gray-400">Reason:</span>
                      <span className="col-span-2 font-bold text-brand-500">
                        {selectedTicket.reason}
                      </span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-gray-500 dark:text-gray-400">Submitted:</span>
                      <span className="col-span-2 text-gray-800 dark:text-gray-200">
                        {new Date(selectedTicket.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Policy Reference */}
                <div className="p-4 bg-brand-50/10 dark:bg-brand-950/10 rounded-2xl border border-brand-200/10 dark:border-brand-900/20 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-brand-500 block">
                    Refund & Dispute Policy Reminder:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Cancellations stop renewals, but do not trigger automatic refunds.</li>
                    <li>Refunds must be reviewed manually on a case-by-case basis.</li>
                    <li>If approved, refunds must be processed through the gateway (Stripe/PayPal).</li>
                    <li>Chargebacks/disputes are handled via standard payment provider processes.</li>
                  </ul>
                </div>

                {/* User Message */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                    User Contact Us Message:
                  </h4>
                  <div className="bg-brand-50/20 dark:bg-brand-950/10 p-4 rounded-2xl border border-brand-200/20 dark:border-brand-900/30 text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic whitespace-pre-line">
                    "{selectedTicket.message || "No comments written by user."}"
                  </div>
                </div>

                {/* Status Quick Action Buttons */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                    Refund / Decline Resolution
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleChangeTicketStatus("Approved")}
                      disabled={selectedTicket.status === "Approved"}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all"
                    >
                      <IoCheckmarkCircleOutline className="text-lg" />
                      Approve Refund
                    </button>
                    <button
                      onClick={() => handleChangeTicketStatus("Declined")}
                      disabled={selectedTicket.status === "Declined"}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all"
                    >
                      <IoCloseCircleOutline className="text-lg" />
                      Decline Request
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                    Workflow Status Tracking
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleChangeTicketStatus("Refunded")}
                      className={`flex-1 py-2 text-xs rounded-lg font-bold border transition-all ${selectedTicket.status === "Refunded"
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      Mark Refunded
                    </button>
                    <button
                      onClick={() => handleChangeTicketStatus("Closed")}
                      className={`flex-1 py-2 text-xs rounded-lg font-bold border transition-all ${selectedTicket.status === "Closed"
                          ? "bg-gray-600 border-gray-600 text-white"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      Mark Closed
                    </button>
                    <button
                      onClick={() => handleChangeTicketStatus("Pending")}
                      className={`flex-1 py-2 text-xs rounded-lg font-bold border transition-all ${selectedTicket.status === "Pending"
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "border-gray-200 dark:border-gray-700 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                    >
                      Set Pending
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column - Actions: Notes and Email */}
              <div className="lg:col-span-6 space-y-6 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 lg:pl-8 pt-6 lg:pt-0">

                {/* Internal Notes */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <IoDocumentTextOutline className="text-brand-500" />
                      Internal Notes (Admin Only)
                    </h4>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Add internal notes about your investigations, billing review findings, etc..."
                    value={internalNoteInput}
                    onChange={(e) => setInternalNoteInput(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-4 py-2 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      {isSavingNotes ? "Saving..." : "Save Internal Notes"}
                    </button>
                  </div>
                </div>

                {/* Email Reply to User */}
                <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <IoMailOutline className="text-brand-500" />
                    Reply to User via Email
                  </h4>

                  {/* Email Replies Thread */}
                  {selectedTicket.replies && selectedTicket.replies.length > 0 && (
                    <div className="space-y-3 max-h-[150px] overflow-y-auto bg-gray-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-2">
                        Sent Emails Thread
                      </span>
                      {selectedTicket.replies.map((reply) => (
                        <div key={reply._id} className="text-xs p-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg space-y-1">
                          <div className="flex justify-between text-gray-400 font-medium">
                            <span>From: Support Admin</span>
                            <span>{new Date(reply.timestamp).toLocaleString()}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded-lg text-xs border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-bold block mb-1">Email Recipient:</span>
                      <span className="text-gray-800 dark:text-gray-200 font-semibold">{selectedTicket.user.email}</span>
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Compose support email reply to the user. They will receive it immediately in their inbox..."
                      value={emailReplyInput}
                      onChange={(e) => setEmailReplyInput(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSendEmailReply}
                      disabled={isSendingEmail || !emailReplyInput.trim()}
                      className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <IoSendOutline />
                      {isSendingEmail ? "Sending..." : "Send Email Response"}
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal actions close */}
            <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-6">
              <button
                onClick={() => setIsTicketModalOpen(false)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl text-sm font-semibold transition-all"
              >
                Close View
              </button>
            </div>

          </div>
        </Modal>
      )}

      {/* ==========================================
         MOCK TICKET SIMULATION FORM MODAL
         ========================================== */}
      <Modal
        isOpen={isSimModalOpen}
        onClose={() => setIsSimModalOpen(false)}
        className="max-w-md"
      >
        <form onSubmit={handleSimulateSubmit} className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <IoCreateOutline className="text-brand-500 text-2xl" />
              Simulate Contact Submission
            </h2>
            <button
              type="button"
              onClick={() => setIsSimModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed dark:text-gray-400">
            Submit a billing request as a mock app user. This creates a ticket in the database list which you can instantly view and resolve.
          </p>

          <div className="space-y-4">

            {/* User ID */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                User ID
              </label>
              <input
                type="text"
                required
                value={simUserId}
                onChange={(e) => setSimUserId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white font-mono"
              />
            </div>

            {/* Username & Email row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={simUsername}
                  onChange={(e) => setSimUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={simEmail}
                  onChange={(e) => setSimEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Subscription ID & Payment ID */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Subscription ID
                </label>
                <input
                  type="text"
                  required
                  value={simSubId}
                  onChange={(e) => setSimSubId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Payment ID (Stripe/PayPal)
                </label>
                <input
                  type="text"
                  required
                  value={simPayId}
                  onChange={(e) => setSimPayId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white font-mono"
                />
              </div>
            </div>

            {/* Reason Select */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Issue Reason
              </label>
              <select
                value={simReason}
                onChange={(e) => setSimReason(e.target.value as any)}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white cursor-pointer"
              >
                <option value="Billing issue">Billing issue</option>
                <option value="Duplicate payment">Duplicate payment</option>
                <option value="Technical issue">Technical issue</option>
                <option value="Accidental purchase">Accidental purchase</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* message */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Optional Message
              </label>
              <textarea
                rows={3}
                placeholder="User description of the billing issue or refund trigger reason..."
                value={simMessage}
                onChange={(e) => setSimMessage(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-brand-500 text-gray-800 dark:text-white"
              />
            </div>

          </div>

          <div className="flex gap-3 justify-end border-t border-gray-100 dark:border-gray-800 pt-4">
            <button
              type="button"
              onClick={() => setIsSimModalOpen(false)}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/10 flex items-center gap-1.5"
            >
              <IoSendOutline />
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
