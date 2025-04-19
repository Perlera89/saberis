import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useFetchData<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  enabled: boolean = true,
  staleTime: number = 1000 * 60 * 60
) {
  return useQuery({
    queryKey,
    queryFn,
    staleTime,
    enabled,
  });
}

export function useFindData<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  enabled: boolean = true
) {
  return useQuery({
    queryKey,
    queryFn,
    enabled,
  });
}

export function useSaveData<T>(
  mutationFn: (data: T) => Promise<void>,
  queryKey: string[],
  successMessage: string,
  errorMessage: string,
  navigation?: string
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(successMessage);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(errorMessage, {
        description: error.message,
      });
    },
    onMutate: () => {
      if (navigation) {
        router.push(navigation);
      } else {
        router.refresh();
      }
    },
  });
}

export function useDeleteData<T>(
  mutationFn: (data: T) => Promise<void>,
  queryKey: string[],
  successMessage: string,
  errorMessage: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success(successMessage);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(errorMessage);
    },
  });
}
