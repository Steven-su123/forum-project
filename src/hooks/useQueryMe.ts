import { getME } from "@/service/auth";
import { useQuery } from "@tanstack/react-query";

export const useQueryMe = () => {
  return useQuery({ queryKey: ["me"], queryFn: getME });
};
