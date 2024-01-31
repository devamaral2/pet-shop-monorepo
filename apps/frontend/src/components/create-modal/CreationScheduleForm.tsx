import { Button, VStack } from "@chakra-ui/react";
import { MutableRefObject } from "react";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { IModalRef } from "../../utils/modalRel";
import { InputDate } from "../input/InputDate";
import { DropSelect } from "./DropSelect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreateScheduleForm({
  modalRef,
}: {
  modalRef: MutableRefObject<IModalRef | null>;
}) {
  const { date, handleChangeDate, handleScheduleCreation } =
    useCreateScheduleContext();
  return (
    <VStack spacing="1rem">
      <DropSelect />
      <InputDate handler={handleChangeDate} actualState={date} />
      <Button
        colorScheme="green"
        onClick={() => {
          handleScheduleCreation();
          modalRef.current && modalRef.current.closeModal();
        }}
      >
        Criar
      </Button>
    </VStack>
  );
}
