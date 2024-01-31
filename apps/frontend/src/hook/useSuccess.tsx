import { useToast } from "@chakra-ui/react";

export function useDefaultToast() {
  const toast = useToast();

  const defaultToast = (
    message: string,
    status: "success" | "error" | "warning"
  ) => {
    toast({
      title: message,
      status,
      duration: 5000,
      position: "top",
    });
  };
  return {
    defaultToast,
  };
}
