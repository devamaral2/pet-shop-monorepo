import { HStack, Text, VStack } from "@chakra-ui/react";
import { FaRegWindowClose } from "react-icons/fa";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { Input } from "../input";

export function DropSelect() {
  const {
    clients,
    handleChangeClientQuery,
    clientQuery,
    setChoosedClient,
    choosedClient,
    isDebouncing,
    isFetching,
  } = useCreateScheduleContext();
  return (
    <VStack w="100%">
      <Input
        handler={handleChangeClientQuery}
        actualState={clientQuery}
        loading={isDebouncing || isFetching}
      />
      {choosedClient ? (
        <HStack>
          <Text>Cliente escolhido: {choosedClient.name}</Text>
          <FaRegWindowClose
            cursor="pointer"
            size="1.5rem"
            color="red"
            onClick={() => setChoosedClient(null)}
          />
        </HStack>
      ) : (
        <Text>Nenhum cliente selecionado</Text>
      )}
      {clients?.length &&
        !choosedClient &&
        clients.map((client) => (
          <HStack
            cursor="pointer"
            key={client.id}
            bg="whitesmoke"
            p=".3rem"
            onClick={() => {
              setChoosedClient(client);
            }}
          >
            <Text>{client.name}</Text>
          </HStack>
        ))}
    </VStack>
  );
}
