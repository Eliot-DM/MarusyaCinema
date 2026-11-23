import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../Api/auth";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    retry: false,
  });
};
