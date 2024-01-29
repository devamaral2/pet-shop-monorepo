import { Button, VStack } from "@chakra-ui/react";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { InputDate } from "../input/InputDate";
import { DropSelect } from "./DropSelect";

export function CreateScheduleForm() {
  const { date, handleChangeDate, handleScheduleCreation } =
    useCreateScheduleContext();
  return (
    <VStack>
      <DropSelect />
      <InputDate handler={handleChangeDate} actualState={date} />
      <Button colorScheme="green" onClick={handleScheduleCreation}>
        Criar
      </Button>
    </VStack>
  );
}
