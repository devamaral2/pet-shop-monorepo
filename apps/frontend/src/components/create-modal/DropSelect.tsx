import { HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";

export function DropSelect() {
  const { clients } = useCreateScheduleContext();
  return (
    <VStack>
      <Input />
      {clients?.lentgh &&
        clients.map((client) => (
          <HStack
            cursor="pointer"
            key={client.id}
            bg="whitesmoke"
            p=".3rem"
            onClick={() => {}}
          >
            <Text>{client.name}</Text>
          </HStack>
        ))}
    </VStack>
  );
}
