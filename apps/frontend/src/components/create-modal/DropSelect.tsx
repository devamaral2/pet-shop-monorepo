import { HStack, Stack, Text } from "@chakra-ui/react";
import { IClient } from "@pet-shop/entities/client";
import { AsyncSelect } from "chakra-react-select";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { findAllClientsWithoutSchedule } from "../../services/createSchedule.service";

export function DropSelect() {
  const { setSelectedClientClient, selectedClient } =
    useCreateScheduleContext();

  return (
    <Stack w="100%">
      {selectedClient ? (
        <HStack
          borderRadius=".4rem"
          border="grey solid 1px"
          justifyContent="space-between"
          bg="#f3f6f6"
          py=".5rem"
          px="2rem"
        >
          <Text>{selectedClient.label}</Text>
          <IoCloseCircleOutline
            size="1.5rem"
            color="red"
            cursor="pointer"
            onClick={() => setSelectedClientClient(null)}
          />
        </HStack>
      ) : (
        <AsyncSelect
          name="colors"
          colorScheme="teal"
          placeholder="Select some colors..."
          loadOptions={(inputValue, callback) => {
            setTimeout(async () => {
              const result = await findAllClientsWithoutSchedule(
                inputValue.toLocaleLowerCase()
              );
              const array = result.map((client: IClient) => ({
                label: client.name,
                value: client.id,
              }));
              const values = array.filter((i: { label: string }) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              );
              callback(values);
            }, 1000);
          }}
          onChange={(client) => setSelectedClientClient(client)}
          value={selectedClient}
          closeMenuOnSelect={false}
          loadingMessage={() => "Carregando..."}
        />
      )}
    </Stack>
  );
}
