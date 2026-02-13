import axios from "axios";

export const handleApiError = (
  error: unknown,
  fallbackMessage = "Something went wrong"
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
