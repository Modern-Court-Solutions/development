import { fetchJson } from "../lib/api";

import { useQuery, useQueryClient, useMutation } from "react-query";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  let error = false;

  const handleLog = async (email, password) => {
    const res = await fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res) {
      error = true;
      throw new Error();
    }
  };

  return {
    signIn: async (email, password) => {
      try {
        const user = await handleLog(email, password);
        queryClient.setQueriesData("user", user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: error,
  };
};
