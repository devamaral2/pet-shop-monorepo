import { FormLabel, HStack, Heading, VStack } from "@chakra-ui/react";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { useGeneralContext } from "../../context/globalProvider";
import { StatusMenu } from "../StatusMenu";
import { Input } from "../input";
import { InputDate } from "../input/InputDate";
import { CreateScheduleModal } from "./CreateScheduleModal";
import { ScheduleBtn } from "./ScheduleBtn";

export function Header() {
  const { filters, setFilters } = useGeneralContext();
  console.log(filters);
  return (
    <VStack w="100%" maxW="1200px" spacing="2rem">
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
            <StatusMenu
              state={filters.status as StatusEnum & "all"}
              steState={(newStatus) =>
                setFilters({
                  ...filters,
                  status: newStatus as StatusEnum & "all",
                })
              }
              isHeaderComponent
            />
          </HStack>
        </VStack>
        <CreateScheduleModal>
          <ScheduleBtn />
        </CreateScheduleModal>
      </HStack>
    </VStack>
  );
}
