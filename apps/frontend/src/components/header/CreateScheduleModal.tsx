import { Stack } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { CreateScheduleProvider } from "../../context/createScheduleProvider";
import { CardModal } from "../create-modal/CardModal";
import { CreateScheduleForm } from "../create-modal/CreationScheduleForm";

interface Props {
  children: ReactNode;
}
export function CreateScheduleModal({ children }: Props) {
  const modalRef = useRef(null);
  return (
    <Stack>
      <CreateScheduleProvider>
        <CardModal
          buttonContent={children}
          title="Agende uma nova consulta"
          ref={modalRef}
        >
          <CreateScheduleForm modalRef={modalRef} />
        </CardModal>
      </CreateScheduleProvider>
    </Stack>
  );
}
