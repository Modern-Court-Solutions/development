import { fetchJson } from "../lib/api";

import { useQueryClient } from "react-query";

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
        console.log("signing in", email, password);
        const user = await handleLog(email, password);
        queryClient.setQueriesData("user", user);
        return true;
      } catch (err) {
        return err;
      }
    },
    signInError: error,
  };
};
