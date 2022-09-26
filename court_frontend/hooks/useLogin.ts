import { fetchJson } from "../lib/loginApi";

export const useLogin = () => {
  let error = false;

  const handleLog = async (email: string, password: string) => {
    const res = await fetchJson("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res) {
      error = true;
      throw new Error("Login failed");
    } else {
      return res;
    }
  };

  return {
    signIn: async (email: string, password: string) => {
      try {
        return await handleLog(email, password);
      } catch (err) {
        return err;
      }
    },
    signInError: error,
  };
};

export const useLogout = () => {
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (!res) {
      throw new Error("Logout failed");
    }
  };

  return {
    signOut: async () => {
      try {
        await handleLogout();
        return true;
      } catch (err) {
        return err;
      }
    },
  };
};
