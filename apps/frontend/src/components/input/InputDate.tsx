import { Input as ChakraInput, InputProps, VStack } from "@chakra-ui/react";

interface Props extends InputProps {
  handler: (value: string, context: "startTime" | "endTime") => void;
  actualState: string;
  context: "startTime" | "endTime";
}

export function InputDate({ handler, actualState, context, ...props }: Props) {
  return (
    <VStack w="100%">
      <ChakraInput
        type={"date"}
        _hover={{ borderColor: "green.600" }}
        _placeholder={{ color: "grey.400" }}
        _focus={{ borderColor: "green.600" }}
        color="black"
        value={actualState}
        onChange={(e) => handler(e.target.value, context)}
        backgroundColor="#F3F6F6"
        focusBorderColor="#33B740"
        borderRadius="md"
        {...props}
      />
    </VStack>
  );
}
