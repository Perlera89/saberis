import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";
import { register, login } from "@/route/auth";
import CryptoJS from "crypto-js";

const SECRET_KEY = "#simapi-tech";

interface AuthState {
  user: Partial<User> | null;
  token: string;
  isLoading: boolean;
  register: (user: Partial<User>) => Promise<void>;
  login: (user: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => {
      const defaultValues = {
        user: null,
        token: "",
        isLoading: false,
      };

      const functions = {
        register: async (user: Partial<User>) => {
          try {
            await register(user);
          } catch (error) {
            throw error;
          }
        },

        login: async (user: Partial<User>) => {
          try {
            const newLogin = await login(user);
            console.log("newLogin", newLogin);
            set({
              user: {
                id: newLogin.user.id,
                name: newLogin.user.name,
                email: newLogin.user.email,
                // thunbnail: newLogin.data.thunbnail,
                role: newLogin.user.role,
              },
              token: newLogin.access_token,
            });
          } catch (error) {
            throw error;
          }
        },

        logout: async () => {
          console.log("logout");
          set({
            user: null,
            token: "",
          });

          sessionStorage.removeItem("auth-storage");
        },
      };

      return {
        ...defaultValues,
        ...functions,
        setUser: (user: User | null) => set({ user }),
      };
    },
    {
      name: "auth-storage",
      // storage: createJSONStorage(() => sessionStorage),
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const data = sessionStorage.getItem(name);
          return data ? decryptData(data) : null;
        },
        setItem: (name, value) => {
          const data = encryptData(value);
          sessionStorage.setItem(name, data);
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      })),
    }
  )
);
