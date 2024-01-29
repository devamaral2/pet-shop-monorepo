import { Stack, StackProps } from "@chakra-ui/react";

export function Container({ children, ...props }: StackProps) {
  return (
    <Stack
      flexDirection={"column"}
      width="100%"
      h="100vh"
      margin="auto"
      alignItems="center"
      justifyContent="center"
      p="2rem"
      {...props}
    >
      <Stack
        flexDirection={"column"}
        w="100%"
        justifyContent="center"
        alignItems={"center"}
      >
        {children}
      </Stack>
    </Stack>
  );
}
