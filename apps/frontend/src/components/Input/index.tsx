import {
  Input as ChakraInput,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { RightIconDebounceInputs } from "./RightInconDebounceInputs";

interface Props extends InputProps {}

export function Input({ ...props }: Props) {
  return (
    <VStack w="100%">
      <FormLabel>Pesquisar pelo nome do cliente</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={CiSearch} />
        </InputLeftElement>
        <ChakraInput
          _hover={{ borderColor: "green.600" }}
          _placeholder={{ color: "grey.400" }}
          _focus={{ borderColor: "green.600" }}
          color="black"
          backgroundColor="#F3F6F6"
          focusBorderColor="#33B740"
          borderRadius="md"
          {...props}
        />
        <InputRightElement>
          <RightIconDebounceInputs />
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
}
