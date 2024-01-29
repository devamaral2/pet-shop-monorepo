import { Icon, Text, VStack } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";

export function ScheduleBtn() {
  return (
    <VStack color={"teal.600"} cursor="pointer">
      <Text>Agendar</Text>
      <Icon as={CiCirclePlus} w="40px" h="40px" />
    </VStack>
  );
}
