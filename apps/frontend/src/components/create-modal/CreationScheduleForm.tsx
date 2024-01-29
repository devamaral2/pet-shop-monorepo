import { Button, VStack } from "@chakra-ui/react";
import { InputDate } from "../input/InputDate";
import { DropSelect } from "./DropSelect";

export function CreateScheduleForm() {
  return (
    <VStack>
      <DropSelect />
      <InputDate
        handler={function (
          value: string,
          context: "startTime" | "endTime"
        ): void {
          throw new Error("Function not implemented.");
        }}
        actualState={""}
        context={"startTime"}
      />
      <Button colorScheme="green">Criar</Button>
    </VStack>
  );
}
