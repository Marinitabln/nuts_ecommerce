import { useQuery } from "@tanstack/react-query";
import { getMe } from "../uses-case/auth-service";
import { getTokenPayload } from "@/lib/auth-token";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!getTokenPayload(),
  });
};
