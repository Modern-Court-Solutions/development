import { fetchJson } from "../lib/api";
import { useQuery, useQueryClient, useMutation } from "react-query";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(({ email, password }) => {
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  });

  return {
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueriesData("user", user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
};
