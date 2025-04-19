import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export function useRegister(
  registerFn: (user: Partial<User>) => Promise<void>
) {
  const router = useRouter();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      toast.success("Registro exitoso");
      router.push("/auth/login");
    },
    onError: (error) => {
      console.log("error", error);
      const errorMessage =
        (error as any)?.response?.data?.message || "Error desconocido";
      toast.error("Error al crear la cuenta", {
        description: errorMessage,
      });
    },
  });
}

export function useLogin(loginFn: (user: Partial<User>) => Promise<void>) {
  const router = useRouter();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    },
    onError: (error) => {
      console.log("error", error);
      const errorMessage =
        (error as any)?.response?.data?.message || "Error desconocido";
      toast.error("Error al iniciar sesión", {
        description: errorMessage,
      });
    },
  });
}
