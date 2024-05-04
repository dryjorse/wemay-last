import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profileService";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
    select: ({ data }) => data,
    enabled: !!localStorage.getItem("wemay-access-token"),
  });
};
