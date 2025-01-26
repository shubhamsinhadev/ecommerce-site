import axiosAPI from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosAPI.post("/api/auth/logout");
    },
    onSuccess: async () => {
      toaster.create({
        title: `Logout successfully`,
        type: "success",
      });
      window.location.href = "/";
    },
    onError: (error) => {
      toaster.create({
        title: `Logout failed`,
        description: error.message,
        type: "error",
      });
    },
  });
};
