import { Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { CardModal } from "../CardModal";

interface Props {
  children: ReactNode;
}
export function CreateScheduleModal({ children }: Props) {
  return (
    <Stack>
      <CardModal buttonContent={children} title="Agende uma nova consulta">
        <Text>Teste </Text>
      </CardModal>
    </Stack>
  );
}
