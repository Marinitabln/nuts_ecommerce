import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../uses-case/users-service";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
