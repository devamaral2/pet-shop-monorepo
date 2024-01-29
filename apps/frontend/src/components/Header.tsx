import { FormLabel, HStack, Heading, VStack } from "@chakra-ui/react";
import { useGeneralContext } from "../context/globalProvider";
import { Input } from "./Input";
import { InputDate } from "./Input/InputDate";

export function Header() {
  const { data } = useGeneralContext();
  console.log(data);
  return (
    <VStack p="1rem" w="100%" maxW="1200px" spacing="2rem">
      <Heading as="h1" size="2xl">
        Agendamentos para petshop
      </Heading>
      <VStack w="50%">
        <Input />
        <FormLabel>Pesquisar por data</FormLabel>
        <HStack>
          <InputDate />
          <InputDate />
        </HStack>
      </VStack>
    </VStack>
  );
}
