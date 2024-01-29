import { FormLabel, HStack, Heading, VStack } from "@chakra-ui/react";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { useGeneralContext } from "../../context/generalProvider";
import { StatusMenu } from "../StatusMenu";
import { Input } from "../input";
import { InputDate } from "../input/InputDate";
import { CreateScheduleModal } from "./CreateScheduleModal";
import { ScheduleBtn } from "./ScheduleBtn";

export function Header() {
  const {
    filters,
    setFilters,
    handleChangeTime,
    handleChangeClientQuery,
    clientQuery,
  } = useGeneralContext();
  const { isFetching, isDebouncing } = useGeneralContext();
  return (
    <VStack w="100%" maxW="1200px" spacing="2rem">
      <Heading as="h1" size="2xl">
        Agendamentos para petshop
      </Heading>
      <HStack w="100%" justifyContent={"space-between"} alignItems={"center"}>
        <VStack w="80%">
          <Input
            handler={handleChangeClientQuery}
            actualState={clientQuery}
            loading={isFetching || isDebouncing}
          />
          <HStack w="100%">
            <VStack w="100%">
              <FormLabel>Pesquisar por data</FormLabel>
              <HStack w="100%">
                <InputDate
                  handler={handleChangeTime}
                  actualState={filters.startTime || ""}
                  context="startTime"
                />
                <InputDate
                  handler={handleChangeTime}
                  actualState={filters.endTime || ""}
                  context="endTime"
                />
              </HStack>
            </VStack>
            <VStack w="80%">
              <FormLabel>Pesquisar status</FormLabel>

              <StatusMenu
                state={filters.status as StatusEnum & "all"}
                setState={(newStatus) =>
                  setFilters({
                    ...filters,
                    status: newStatus as StatusEnum & "all",
                  })
                }
                isHeaderComponent
              />
            </VStack>
          </HStack>
        </VStack>
        <CreateScheduleModal>
          <ScheduleBtn />
        </CreateScheduleModal>
      </HStack>
    </VStack>
  );
}
