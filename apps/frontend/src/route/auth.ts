import { type User } from "@/types";
import { api } from "@/route/api";

export const register = async (user: Partial<User>) => {
  const response = await api.post("/users", {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  });
  return response.data;
};

export const login = async (user: Partial<User>) => {
  const response = await api.post("/auth/signin", {
    email: user.email,
    password: user.password,
  });

  return response.data;
};
