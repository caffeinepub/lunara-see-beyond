import { useCallback, useState } from "react";

export type LunaraUser = {
  name: string;
  email: string;
  isAdmin: boolean;
};

const ADMIN_EMAILS = ["katariavianyt45@gmail.com"];
const STORAGE_KEY = "lunara_user";

export function useAuth() {
  const [user, setUser] = useState<LunaraUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((email: string, password: string): boolean => {
    if (!email || !password) return false;
    try {
      const stored = localStorage.getItem("lunara_users_db");
      const usersDb: Record<string, { name: string; password: string }> = stored
        ? JSON.parse(stored)
        : {};
      const userData = usersDb[email.toLowerCase()];
      if (!userData || userData.password !== password) return false;
      const u: LunaraUser = {
        name: userData.name,
        email: email.toLowerCase(),
        isAdmin: ADMIN_EMAILS.includes(email.toLowerCase()),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUser(u);
      return true;
    } catch {
      return false;
    }
  }, []);

  const register = useCallback(
    (name: string, email: string, password: string): boolean => {
      if (!name || !email || !password) return false;
      try {
        const stored = localStorage.getItem("lunara_users_db");
        const usersDb: Record<string, { name: string; password: string }> =
          stored ? JSON.parse(stored) : {};
        if (usersDb[email.toLowerCase()]) return false;
        usersDb[email.toLowerCase()] = { name, password };
        localStorage.setItem("lunara_users_db", JSON.stringify(usersDb));
        const u: LunaraUser = {
          name,
          email: email.toLowerCase(),
          isAdmin: ADMIN_EMAILS.includes(email.toLowerCase()),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        setUser(u);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  /** Returns true if the email exists in the local users DB */
  const emailExists = useCallback((email: string): boolean => {
    try {
      const stored = localStorage.getItem("lunara_users_db");
      if (!stored) return false;
      const usersDb: Record<string, { name: string; password: string }> =
        JSON.parse(stored);
      return !!usersDb[email.toLowerCase()];
    } catch {
      return false;
    }
  }, []);

  /** Resets the password for an existing account */
  const resetPassword = useCallback(
    (email: string, newPassword: string): boolean => {
      try {
        const stored = localStorage.getItem("lunara_users_db");
        if (!stored) return false;
        const usersDb: Record<string, { name: string; password: string }> =
          JSON.parse(stored);
        const key = email.toLowerCase();
        if (!usersDb[key]) return false;
        usersDb[key].password = newPassword;
        localStorage.setItem("lunara_users_db", JSON.stringify(usersDb));
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  return {
    user,
    login,
    register,
    logout,
    emailExists,
    resetPassword,
    isAdmin: user?.isAdmin ?? false,
  };
}
