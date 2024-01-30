import { Button, VStack } from "@chakra-ui/react";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { InputDate } from "../input/InputDate";
import { DropSelect } from "./DropSelect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreateScheduleForm({ modalRef }: { modalRef: any }) {
  const { date, handleChangeDate, handleScheduleCreation } =
    useCreateScheduleContext();
  return (
    <VStack>
      <DropSelect />
      <InputDate handler={handleChangeDate} actualState={date} />
      <Button
        colorScheme="green"
        onClick={() => {
          modalRef.current.closeModal();
          handleScheduleCreation();
        }}
      >
        Criar
      </Button>
    </VStack>
  );
}
