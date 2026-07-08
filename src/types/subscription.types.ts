export interface PremiumPlan {
  _id: string;
  name: string;
  category: string;
  price: number;
  duration: string; // "weekly", "monthly", "yearly", etc.
  features?: string[];
  createdAt?: string;
}

export interface CreatePlanPayload {
  name: string;
  category: string;
  price: number;
  duration: string;
  features?: string[];
}

export interface GetPlansParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface GetPlansResponse {
  success: boolean;
  data: PremiumPlan[];
  totalCount: number;
  totalPages: number;
}

export interface RefundTicketReply {
  _id: string;
  sender: "Admin";
  message: string;
  timestamp: string;
}

export interface RefundTicket {
  _id: string;
  userId: string;
  user: {
    _id: string;
    username: string;
    email: string;
    profileImg?: string;
  };
  subscriptionId: string;
  paymentId: string;
  reason: string;
  message?: string;
  createdAt: string;
  status: "Pending" | "Refunded" | "Declined" | "Approved" | "Closed";
  internalNotes?: string;
  replies?: RefundTicketReply[];
}

export interface UpdateTicketPayload {
  status: "Pending" | "Refunded" | "Declined" | "Approved" | "Closed";
  internalNotes?: string;
}

export interface GetRefundTicketsResponse {
  success: boolean;
  data: RefundTicket[];
  totalCount: number;
}
