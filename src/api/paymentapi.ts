import axiosInstance from "../utils/axios";
import {
  Payment,
  RefundRequest,
  GetPaymentsParams,
  GetPaymentsResponse,
  GetRefundRequestsResponse
} from "../types/payment.types";

/* ==========================================================================
   INITIAL MOCK DATA GENERATION & PERSISTENCE (LOCAL STORAGE FALLBACK)
   ========================================================================== */

const INITIAL_MOCK_PAYMENTS: Payment[] = [
  {
    _id: "pay_001",
    user: { _id: "usr_101", username: "goth_queen", email: "gothqueen@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    item: "Premium (1 Month)",
    amount: 9.99,
    status: "Completed",
    paymentMethod: "Visa",
    transactionId: "txn_1092837465",
    paymentProviderReference: "ch_1O92837465_stripe"
  },
  {
    _id: "pay_002",
    user: { _id: "usr_102", username: "leather_daddy", email: "leatherdaddy@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    item: "Premium (1 Year)",
    amount: 79.99,
    status: "Completed",
    paymentMethod: "Apple Pay",
    transactionId: "txn_8829103948",
    paymentProviderReference: "pay_apple_8829103948"
  },
  {
    _id: "pay_003",
    user: { _id: "usr_103", username: "mistress_eva", email: "eva.mistress@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
    item: "Sticker Pack: Cute Collars",
    amount: 2.99,
    status: "Completed",
    paymentMethod: "PayPal",
    transactionId: "txn_7730192847",
    paymentProviderReference: "pp_7730192847_ref"
  },
  {
    _id: "pay_004",
    user: { _id: "usr_104", username: "sub_boy_01", email: "subboy@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 1 day ago
    item: "Premium (6 Months)",
    amount: 49.99,
    status: "Failed",
    paymentMethod: "Google Pay",
    transactionId: "txn_3392810392",
    paymentProviderReference: "gp_3392810392_failed"
  },
  {
    _id: "pay_005",
    user: { _id: "usr_105", username: "latex_barbie", email: "latexbarbie@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    item: "Premium (1 Month)",
    amount: 9.99,
    status: "Completed",
    paymentMethod: "Visa",
    transactionId: "txn_4492810382",
    paymentProviderReference: "ch_4492810382_stripe"
  },
  {
    _id: "pay_006",
    user: { _id: "usr_106", username: "rope_wizard", email: "ropewizard@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    item: "Premium (1 Year)",
    amount: 79.99,
    status: "Completed",
    paymentMethod: "Visa",
    transactionId: "txn_5582910391",
    paymentProviderReference: "ch_5582910391_stripe"
  },
  {
    _id: "pay_007",
    user: { _id: "usr_107", username: "kinky_kitty", email: "kittykinks@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
    item: "Sticker Pack: Neon Kinks",
    amount: 3.99,
    status: "Completed",
    paymentMethod: "Apple Pay",
    transactionId: "txn_1192837402",
    paymentProviderReference: "pay_apple_1192837402"
  },
  {
    _id: "pay_008",
    user: { _id: "usr_108", username: "sub_babe", email: "subbabe@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    item: "Premium (1 Month)",
    amount: 9.99,
    status: "Failed",
    paymentMethod: "PayPal",
    transactionId: "txn_9928103921",
    paymentProviderReference: "pp_9928103921_error"
  },
  {
    _id: "pay_009",
    user: { _id: "usr_109", username: "kink_explorer", email: "explorer@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(), // 28 days ago
    item: "Premium (6 Months)",
    amount: 49.99,
    status: "Completed",
    paymentMethod: "Google Pay",
    transactionId: "txn_6672839102",
    paymentProviderReference: "gp_6672839102_ref"
  },
  {
    _id: "pay_010",
    user: { _id: "usr_110", username: "switch_pixie", email: "pixie@example.com", profileImg: "" },
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
    item: "Premium (1 Month)",
    amount: 9.99,
    status: "Completed",
    paymentMethod: "Visa",
    transactionId: "txn_2291039481",
    paymentProviderReference: "ch_2291039481_stripe"
  }
];

const INITIAL_MOCK_REFUNDS: RefundRequest[] = [
  {
    _id: "ref_001",
    userId: "usr_104",
    user: { _id: "usr_104", username: "sub_boy_01", email: "subboy@example.com" },
    subscriptionId: "sub_subboy123",
    paymentId: "ch_3Mtg1nLkdIwHu7ix1a2b3c4d",
    reason: "Technical issue",
    message: "The payment went through on my card, but the app crashed and my premium profile wasn't activated. Please refund or activate my premium status.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "Pending",
    internalNotes: "Checking stripe charge status. It is indeed completed on Stripe but webhook failed.",
    replies: []
  },
  {
    _id: "ref_002",
    userId: "usr_105",
    user: { _id: "usr_105", username: "latex_barbie", email: "latexbarbie@example.com" },
    subscriptionId: "sub_barbie777",
    paymentId: "ch_4492810382_stripe",
    reason: "Duplicate payment",
    message: "I was charged twice when subscribing to premium this month. Please refund the second charge.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    status: "Pending",
    internalNotes: "",
    replies: []
  },
  {
    _id: "ref_003",
    userId: "usr_108",
    user: { _id: "usr_108", username: "sub_babe", email: "subbabe@example.com" },
    subscriptionId: "sub_babe999",
    paymentId: "pp_9928103921_error",
    reason: "Accidental purchase",
    message: "My subscription renewed automatically and I forgot to cancel it. I haven't logged in since the renewal. Would appreciate a refund.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    status: "Approved",
    internalNotes: "Approved because user has no activity since renewal date. Sent to payment gateway.",
    replies: [
      {
        _id: "rep_001",
        sender: "Admin",
        message: "Hello, we have approved your refund request. It should appear back in your payment method within 5-10 business days.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString()
      }
    ]
  },
  {
    _id: "ref_004",
    userId: "usr_110",
    user: { _id: "usr_110", username: "switch_pixie", email: "pixie@example.com" },
    subscriptionId: "sub_pixie444",
    paymentId: "ch_2291039481_stripe",
    reason: "Other",
    message: "Moving to a different city and cannot use the app anymore.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    status: "Closed",
    internalNotes: "User subscription already cancelled, refund declined as subscription has been active for 20+ days.",
    replies: [
      {
        _id: "rep_002",
        sender: "Admin",
        message: "Hi there, since your subscription has already been active for the majority of the billing cycle, we cannot issue a refund for this month. However, your subscription has been successfully cancelled and you will not be charged again.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString()
      }
    ]
  }
];

// Helper to initialize and retrieve local storage data
const getStoredPayments = (): Payment[] => {
  const data = localStorage.getItem("kinklink_mock_payments");
  if (!data) {
    localStorage.setItem("kinklink_mock_payments", JSON.stringify(INITIAL_MOCK_PAYMENTS));
    return INITIAL_MOCK_PAYMENTS;
  }
  return JSON.parse(data);
};

const setStoredPayments = (payments: Payment[]) => {
  localStorage.setItem("kinklink_mock_payments", JSON.stringify(payments));
};

const getStoredRefundRequests = (): RefundRequest[] => {
  const data = localStorage.getItem("kinklink_mock_refunds");
  if (!data) {
    localStorage.setItem("kinklink_mock_refunds", JSON.stringify(INITIAL_MOCK_REFUNDS));
    return INITIAL_MOCK_REFUNDS;
  }
  return JSON.parse(data);
};

const setStoredRefundRequests = (requests: RefundRequest[]) => {
  localStorage.setItem("kinklink_mock_refunds", JSON.stringify(requests));
};


/* ==========================================================================
   API METHODS
   ========================================================================== */

/**
 * FETCH PAYMENTS HISTORY
 */
export const getPaymentsApi = async (
  params: GetPaymentsParams
): Promise<GetPaymentsResponse> => {
  try {
    // Try sending real backend API request first
    const res = await axiosInstance.get<GetPaymentsResponse>("/api/admin/payments", { params });
    return res.data;
  } catch (error) {
    console.warn("Backend /api/admin/payments not found or errored. Using high-fidelity mock fallback.", error);
    
    // Simulate database query filter locally
    let payments = getStoredPayments();
    
    // 1. Search Filter
    if (params.search) {
      const q = params.search.toLowerCase();
      payments = payments.filter(
        (p) =>
          p.user.username.toLowerCase().includes(q) ||
          p.user.email.toLowerCase().includes(q) ||
          p.transactionId.toLowerCase().includes(q) ||
          p.paymentProviderReference.toLowerCase().includes(q)
      );
    }
    
    // 2. Status Filter
    if (params.status && params.status !== "All") {
      payments = payments.filter((p) => p.status === params.status);
    }
    
    // 3. Payment Method Filter
    if (params.paymentMethod && params.paymentMethod !== "All") {
      payments = payments.filter((p) => p.paymentMethod === params.paymentMethod);
    }
    
    // 4. Item Type Filter
    if (params.itemType && params.itemType !== "All") {
      if (params.itemType === "Premium") {
        payments = payments.filter((p) => p.item.toLowerCase().includes("premium"));
      } else if (params.itemType === "Sticker Pack") {
        payments = payments.filter((p) => p.item.toLowerCase().includes("sticker"));
      }
    }
    
    // 5. Date Filter
    if (params.dateFilter && params.dateFilter !== "All") {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (params.dateFilter === "Today") {
        payments = payments.filter((p) => new Date(p.dateTime) >= startOfToday);
      } else if (params.dateFilter === "Last 7 days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        payments = payments.filter((p) => new Date(p.dateTime) >= sevenDaysAgo);
      } else if (params.dateFilter === "Last 30 days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        payments = payments.filter((p) => new Date(p.dateTime) >= thirtyDaysAgo);
      } else if (params.dateFilter === "Custom" && params.startDate) {
        const start = new Date(params.startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = params.endDate ? new Date(params.endDate) : new Date(params.startDate);
        end.setHours(23, 59, 59, 999);
        
        payments = payments.filter((p) => {
          const d = new Date(p.dateTime);
          return d >= start && d <= end;
        });
      }
    }
    
    // Sort by Date descending
    payments.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
    
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPayments = payments.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedPayments,
      totalCount: payments.length,
      totalPages: Math.ceil(payments.length / limit)
    };
  }
};

/**
 * FETCH BILLING & REFUND TICKETS
 */
export const getRefundRequestsApi = async (): Promise<GetRefundRequestsResponse> => {
  try {
    const res = await axiosInstance.get<GetRefundRequestsResponse>("/api/admin/refund-requests");
    return res.data;
  } catch (error) {
    console.warn("Backend /api/admin/refund-requests not found. Using high-fidelity mock fallback.", error);
    
    const requests = getStoredRefundRequests();
    // Sort pending first, then by date descending
    requests.sort((a, b) => {
      if (a.status === "Pending" && b.status !== "Pending") return -1;
      if (a.status !== "Pending" && b.status === "Pending") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return {
      success: true,
      data: requests,
      totalCount: requests.length
    };
  }
};

/**
 * UPDATE REFUND TICKET (Status, Notes, etc.)
 */
export const updateRefundRequestApi = async (
  id: string,
  updates: Partial<RefundRequest>
): Promise<RefundRequest> => {
  try {
    const res = await axiosInstance.patch<RefundRequest>(`/api/admin/refund-requests/${id}`, updates);
    return res.data;
  } catch (error) {
    console.warn(`Backend /api/admin/refund-requests/${id} not found. Mutating local storage.`, error);
    
    const requests = getStoredRefundRequests();
    const index = requests.findIndex((r) => r._id === id);
    if (index === -1) {
      throw new Error("Refund ticket not found.");
    }
    
    const updatedTicket = {
      ...requests[index],
      ...updates
    };
    
    // Automatically record payment history status update if approved/refunded
    if (updates.status === "Approved" || updates.status === "Refunded") {
      const payments = getStoredPayments();
      // Try to find matching transaction
      const paymentIndex = payments.findIndex(p => p.transactionId === updatedTicket.paymentId || p.paymentProviderReference === updatedTicket.paymentId);
      if (paymentIndex !== -1) {
        // Just for simulation, if refunded we could mark or refund in payments
        // We will keep it simple
      }
    }
    
    requests[index] = updatedTicket;
    setStoredRefundRequests(requests);
    
    return updatedTicket;
  }
};

/**
 * REPLY TO USER VIA EMAIL (Simulated email reply)
 */
export const replyToUserByEmailApi = async (
  id: string,
  message: string
): Promise<RefundRequest> => {
  try {
    const res = await axiosInstance.post<RefundRequest>(`/api/admin/refund-requests/${id}/reply`, { message });
    return res.data;
  } catch (error) {
    console.warn(`Backend /api/admin/refund-requests/${id}/reply not found. Mutating local storage.`, error);
    
    const requests = getStoredRefundRequests();
    const index = requests.findIndex((r) => r._id === id);
    if (index === -1) {
      throw new Error("Refund ticket not found.");
    }
    
    const ticket = requests[index];
    const newReply = {
      _id: `rep_${Date.now()}`,
      sender: "Admin" as const,
      message,
      timestamp: new Date().toISOString()
    };
    
    const replies = ticket.replies ? [...ticket.replies, newReply] : [newReply];
    const updatedTicket = {
      ...ticket,
      replies
    };
    
    requests[index] = updatedTicket;
    setStoredRefundRequests(requests);
    
    return updatedTicket;
  }
};

/**
 * SIMULATE USER REFUND TICKET SUBMISSION
 */
export const simulateSubmitRefundRequestApi = async (payload: {
  userId: string;
  username: string;
  email: string;
  subscriptionId: string;
  paymentId: string;
  reason: RefundRequest["reason"];
  message?: string;
}): Promise<RefundRequest> => {
  // Try sending to the backend simulation just in case
  try {
    const res = await axiosInstance.post<RefundRequest>("/api/admin/refund-requests/simulate", payload);
    return res.data;
  } catch (error) {
    console.warn("Backend /api/admin/refund-requests/simulate not found. Submitting locally to local storage.", error);
    
    const requests = getStoredRefundRequests();
    const newTicket: RefundRequest = {
      _id: `ref_sim_${Date.now()}`,
      userId: payload.userId,
      user: {
        _id: payload.userId,
        username: payload.username,
        email: payload.email
      },
      subscriptionId: payload.subscriptionId,
      paymentId: payload.paymentId,
      reason: payload.reason,
      message: payload.message,
      createdAt: new Date().toISOString(),
      status: "Pending",
      internalNotes: "",
      replies: []
    };
    
    requests.push(newTicket);
    setStoredRefundRequests(requests);
    
    // Also, if we don't have this payment transaction in our mock history, let's create a corresponding completed payment for it!
    const payments = getStoredPayments();
    const hasPayment = payments.some(p => p.transactionId === payload.paymentId || p.paymentProviderReference === payload.paymentId);
    if (!hasPayment) {
      const isSticker = payload.reason === "Other" && payload.message?.toLowerCase().includes("sticker");
      const item = isSticker ? "Sticker Pack: User Choice" : "Premium (1 Month)";
      const amount = isSticker ? 4.99 : 9.99;
      
      const newPayment: Payment = {
        _id: `pay_sim_${Date.now()}`,
        user: {
          _id: payload.userId,
          username: payload.username,
          email: payload.email
        },
        dateTime: new Date().toISOString(),
        item,
        amount,
        status: "Completed",
        paymentMethod: "Visa",
        transactionId: payload.paymentId,
        paymentProviderReference: payload.paymentId.includes("_stripe") ? payload.paymentId : `${payload.paymentId}_stripe`
      };
      payments.push(newPayment);
      setStoredPayments(payments);
    }
    
    return newTicket;
  }
};
