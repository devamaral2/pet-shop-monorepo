import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { CreateScheduleProvider } from "../../context/createScheduleProvider";
import { CardModal } from "../create-modal/CardModal";
import { CreateScheduleForm } from "../create-modal/CreationScheduleForm";

interface Props {
  children: ReactNode;
}
export function CreateScheduleModal({ children }: Props) {
  return (
    <Stack>
      <CreateScheduleProvider>
        <CardModal buttonContent={children} title="Agende uma nova consulta">
          <CreateScheduleForm />
        </CardModal>
      </CreateScheduleProvider>
    </Stack>
  );
}
