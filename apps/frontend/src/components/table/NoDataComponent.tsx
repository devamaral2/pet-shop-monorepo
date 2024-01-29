import { Text, VStack } from "@chakra-ui/react";
import React from "react";

export function NoDataComponent() {
  return (
    <VStack w="100%" minH="10rem" justifyContent="center" alignItems="center">
      <Text color="gray.500"> Agenda vazia </Text>
    </VStack>
  );
}
