import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom"; 


interface ApiError {
  response?: {
    status?: number;
  };
}

export const handleApiError = (
  err: unknown,
  navigate?: NavigateFunction,
  message: string = "An unexpected error occurred."
) => {
  console.error(err); // Log the error for debugging

  const apiError = err as ApiError;

  if (navigate && apiError.response?.status === 500) {
    navigate("/500");
    toast.error("Server error, please try again later.");
    return;
  }

  toast.error(message);
};
