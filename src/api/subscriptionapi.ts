import axiosInstance from "../utils/axios";
import {
  PremiumPlan,
  CreatePlanPayload,
  GetPlansParams,
  GetPlansResponse,
  RefundTicket,
  UpdateTicketPayload,
  GetRefundTicketsResponse
} from "../types/subscription.types";

/* ==========================================================================
   INITIAL MOCK DATA FOR SUBSCRIPTION PLANS AND TICKETS (LOCAL STORAGE FALLBACK)
   ========================================================================== */

const INITIAL_MOCK_PLANS: PremiumPlan[] = [
  {
    _id: "plan_gold_weekly",
    name: "Gold Weekly",
    category: "Personal",
    price: 9.99,
    duration: "weekly",
    features: ["Unlimited Likes", "Incognito Mode", "Profile Badge"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString()
  },
  {
    _id: "plan_platinum_monthly",
    name: "Platinum Monthly",
    category: "Personal",
    price: 29.99,
    duration: "monthly",
    features: ["Unlimited Likes", "Incognito Mode", "Profile Badge", "5 Free Stickers/mo", "Priority Verification"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
  },
  {
    _id: "plan_diamond_yearly",
    name: "Diamond Yearly",
    category: "Business",
    price: 199.99,
    duration: "yearly",
    features: ["Commercial Use", "Featured Events", "Analytics Dashboard", "Priority Support", "Profile Badge"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  }
];

const INITIAL_MOCK_TICKETS: RefundTicket[] = [
  {
    _id: "tkt_001",
    userId: "usr_104",
    user: { _id: "usr_104", username: "sub_boy_01", email: "subboy@example.com" },
    subscriptionId: "sub_subboy123",
    paymentId: "txn_1092837465",
    reason: "Technical issue",
    message: "The payment went through on my card, but the app crashed and my premium profile wasn't activated. Please refund or activate my premium status.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "Pending",
    internalNotes: "Checking stripe charge status. It is indeed completed on Stripe but webhook failed.",
    replies: []
  },
  {
    _id: "tkt_002",
    userId: "usr_105",
    user: { _id: "usr_105", username: "latex_barbie", email: "latexbarbie@example.com" },
    subscriptionId: "sub_barbie777",
    paymentId: "ch_4492810382_stripe",
    reason: "Duplicate payment",
    message: "I was charged twice when subscribing to premium this month. Please refund the second charge.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    status: "Refunded",
    internalNotes: "User had duplicate payment issue. Approved.",
    replies: []
  },
  {
    _id: "tkt_003",
    userId: "usr_108",
    user: { _id: "usr_108", username: "sub_babe", email: "subbabe@example.com" },
    subscriptionId: "sub_babe999",
    paymentId: "pp_9928103921_error",
    reason: "Accidental purchase",
    message: "My subscription renewed automatically and I forgot to cancel it. I haven't logged in since the renewal.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    status: "Declined",
    internalNotes: "Declined as user had duplicate activity check and active log usage on renewal day.",
    replies: [
      {
        _id: "rep_001",
        sender: "Admin",
        message: "Your refund has been declined as we detected active profile interactions after the renewal date.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString()
      }
    ]
  }
];

// Helper to initialize and retrieve local storage data
const getStoredPlans = (): PremiumPlan[] => {
  const data = localStorage.getItem("kinklink_mock_plans");
  if (!data) {
    localStorage.setItem("kinklink_mock_plans", JSON.stringify(INITIAL_MOCK_PLANS));
    return INITIAL_MOCK_PLANS;
  }
  return JSON.parse(data);
};

const setStoredPlans = (plans: PremiumPlan[]) => {
  localStorage.setItem("kinklink_mock_plans", JSON.stringify(plans));
};

const getStoredTickets = (): RefundTicket[] => {
  const data = localStorage.getItem("kinklink_mock_tickets");
  if (!data) {
    localStorage.setItem("kinklink_mock_tickets", JSON.stringify(INITIAL_MOCK_TICKETS));
    return INITIAL_MOCK_TICKETS;
  }
  return JSON.parse(data);
};

const setStoredTickets = (tickets: RefundTicket[]) => {
  localStorage.setItem("kinklink_mock_tickets", JSON.stringify(tickets));
};

/* ==========================================================================
   API METHODS
   ========================================================================== */

/**
 * 1A. Create a New Plan
 * Endpoint: POST /create-premium-plan
 */
export const createPremiumPlanApi = async (
  payload: CreatePlanPayload
): Promise<PremiumPlan> => {
  try {
    const res = await axiosInstance.post<PremiumPlan>("api/plan/create-premium-plan", payload);
    return res.data;
  } catch (error) {
    console.warn("Backend POST /create-premium-plan not found or errored. Using local storage simulation.", error);
    const plans = getStoredPlans();
    const newPlan: PremiumPlan = {
      _id: `plan_${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };
    plans.push(newPlan);
    setStoredPlans(plans);
    return newPlan;
  }
};

/**
 * 1B. Get All Plans (Admin View)
 * Endpoint: GET /admin-all-premium-plans?page=1&limit=10&category=Personal&search=Gold
 */
export const getPremiumPlansApi = async (
  params: GetPlansParams
): Promise<GetPlansResponse> => {
  try {
    const res = await axiosInstance.get<GetPlansResponse>("api/plan/admin-all-premium-plans", { params });
    return res.data;
  } catch (error) {
    console.warn("Backend GET /admin-all-premium-plans not found. Using local storage simulation.", error);
    let plans = getStoredPlans();

    // Filter by Category
    if (params.category && params.category !== "All") {
      plans = plans.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
    }

    // Filter by Search Query
    if (params.search) {
      const q = params.search.toLowerCase();
      plans = plans.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.features && p.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    // Sort by date descending
    plans.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());

    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedPlans = plans.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedPlans,
      totalCount: plans.length,
      totalPages: Math.ceil(plans.length / limit)
    };
  }
};

/**
 * 1C. Get All Refund Tickets
 * Endpoint: GET /admin/tickets?status=Pending
 */
export const getRefundTicketsApi = async (params: {
  status?: string;
}): Promise<GetRefundTicketsResponse> => {
  try {
    const res = await axiosInstance.get<GetRefundTicketsResponse>("api/plan/admin/tickets", { params });
    return res.data;
  } catch (error) {
    console.warn("Backend GET /admin/tickets not found. Using local storage simulation.", error);
    let tickets = getStoredTickets();

    // Filter by Status
    if (params.status && params.status !== "All") {
      tickets = tickets.filter((t) => t.status.toLowerCase() === params.status!.toLowerCase());
    }

    // Sort: Pending first, then by date descending
    tickets.sort((a, b) => {
      if (a.status === "Pending" && b.status !== "Pending") return -1;
      if (a.status !== "Pending" && b.status === "Pending") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return {
      success: true,
      data: tickets,
      totalCount: tickets.length
    };
  }
};

/**
 * 1D. Update Refund Ticket Status
 * Endpoint: PATCH /admin/tickets/:ticketId
 */
export const updateRefundTicketStatusApi = async (
  ticketId: string,
  payload: UpdateTicketPayload
): Promise<RefundTicket> => {
  try {
    const res = await axiosInstance.patch<RefundTicket>(`api/plan/admin/tickets/${ticketId}`, payload);
    return res.data;
  } catch (error) {
    console.warn(`Backend PATCH /admin/tickets/${ticketId} not found. Mutating local storage simulation.`, error);
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t) => t._id === ticketId);
    if (index === -1) {
      throw new Error("Refund ticket not found.");
    }

    const updatedTicket = {
      ...tickets[index],
      ...payload
    };

    tickets[index] = updatedTicket;
    setStoredTickets(tickets);
    return updatedTicket;
  }
};

/**
 * SIMULATE REFUND TICKET SUBMISSION (to keep similarity with simulation button in UI)
 */
export const simulateSubmitRefundTicketApi = async (payload: {
  userId: string;
  username: string;
  email: string;
  subscriptionId: string;
  paymentId: string;
  reason: string;
  message?: string;
}): Promise<RefundTicket> => {
  try {
    const res = await axiosInstance.post<RefundTicket>("api/plan/admin/tickets/simulate", payload);
    return res.data;
  } catch (error) {
    console.warn("Backend POST /admin/tickets/simulate not found. Submitting locally to local storage.", error);
    const tickets = getStoredTickets();
    const newTicket: RefundTicket = {
      _id: `tkt_sim_${Date.now()}`,
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
    tickets.push(newTicket);
    setStoredTickets(tickets);
    return newTicket;
  }
};
