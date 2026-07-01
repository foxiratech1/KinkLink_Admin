export interface Payment {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
    profileImg?: string;
  };
  dateTime: string;
  item: string;
  amount: number;
  status: "Completed" | "Failed";
  paymentMethod: "Visa" | "PayPal" | "Apple Pay" | "Google Pay";
  transactionId: string;
  paymentProviderReference: string;
}

export interface RefundReply {
  _id: string;
  sender: "Admin";
  message: string;
  timestamp: string;
}

export interface RefundRequest {
  _id: string;
  userId: string;
  user: {
    _id: string;
    username: string;
    email: string;
    profileImg?: string;
  };
  subscriptionId: string;
  paymentId: string; // Stripe Charge or Payment Intent
  reason: "Billing issue" | "Duplicate payment" | "Technical issue" | "Accidental purchase" | "Other";
  message?: string;
  createdAt: string;
  status: "Pending" | "Approved" | "Declined" | "Refunded" | "Closed";
  internalNotes?: string;
  replies?: RefundReply[];
}

export interface GetPaymentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "All" | "Completed" | "Failed";
  paymentMethod?: "All" | "Visa" | "PayPal" | "Apple Pay" | "Google Pay";
  itemType?: "All" | "Premium" | "Sticker Pack";
  dateFilter?: "All" | "Today" | "Last 7 days" | "Last 30 days" | "Custom";
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface GetPaymentsResponse {
  success: boolean;
  data: Payment[];
  totalCount: number;
  totalPages: number;
}

export interface GetRefundRequestsResponse {
  success: boolean;
  data: RefundRequest[];
  totalCount: number;
}
