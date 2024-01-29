import { FormLabel, HStack, Heading, VStack } from "@chakra-ui/react";
import { useGeneralContext } from "../../context/globalProvider";
import { Input } from "../input";
import { InputDate } from "../input/InputDate";
import { CreateScheduleModal } from "./CreateScheduleModal";
import { ScheduleBtn } from "./ScheduleBtn";

export function Header() {
  const { data } = useGeneralContext();
  console.log(data);
  return (
    <VStack p="1rem" w="100%" maxW="1200px" spacing="2rem">
      <Heading as="h1" size="2xl">
        Agendamentos para petshop
      </Heading>
      <HStack w="100%" justifyContent={"space-between"} alignItems={"center"}>
        <VStack w="70%">
          <Input />
          <FormLabel>Pesquisar por data</FormLabel>
          <HStack w="100%">
            <InputDate />
            <InputDate />
          </HStack>
        </VStack>
        <CreateScheduleModal>
          <ScheduleBtn />
        </CreateScheduleModal>
      </HStack>
    </VStack>
  );
}
