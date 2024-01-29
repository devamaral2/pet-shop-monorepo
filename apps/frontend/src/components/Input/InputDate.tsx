import { Input as ChakraInput, InputProps, VStack } from "@chakra-ui/react";

interface Props extends InputProps {}

export function InputDate({ ...props }: Props) {
  return (
    <VStack w="100%">
      <ChakraInput
        type={"date"}
        _hover={{ borderColor: "green.600" }}
        _placeholder={{ color: "grey.400" }}
        _focus={{ borderColor: "green.600" }}
        color="black"
        backgroundColor="#F3F6F6"
        focusBorderColor="#33B740"
        borderRadius="md"
        {...props}
      />
    </VStack>
  );
}
