import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <Stack
      w="100%"
      maxW="1200px"
      color="415a77"
      borderRadius={"1rem"}
      border={"black, solid, 5px"}
    >
      {children}
    </Stack>
  );
}
