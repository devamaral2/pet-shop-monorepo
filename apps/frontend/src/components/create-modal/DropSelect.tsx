import { Stack } from "@chakra-ui/react";
import { IClient } from "@pet-shop/entities/client";
import { AsyncSelect, chakraComponents } from "chakra-react-select";
import { useState } from "react";
import { useCreateScheduleContext } from "../../context/createScheduleProvider";
import { findAllClientsWithoutSchedule } from "../../services/createSchedule.service";

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
  const colourOptions = [{ label: "red" }, { label: "green" }];
  const [inputValue, setInputValue] = useState("");

  const asyncComponents = {
    LoadingIndicator: (props) => (
      <chakraComponents.LoadingIndicator
        // The color of the main line which makes up the spinner
        // This could be accomplished using `chakraStyles` but it is also available as a custom prop
        color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
        // The color of the remaining space that makes up the spinner
        emptyColor="transparent"
        // The `size` prop on the Chakra spinner
        // Defaults to one size smaller than the Select's size
        spinnerSize="md"
        // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
        speed="0.45s"
        // A CSS size string representing the thickness of the spinner's line
        thickness="2px"
        // Don't forget to forward the props!
        {...props}
      />
    ),
  };

  return (
    <Stack w="100%">
      <AsyncSelect
        name="colors"
        components={asyncComponents}
        colorScheme="teal"
        placeholder="Select some colors..."
        loadOptions={(inputValue, callback) => {
          setTimeout(async () => {
            const result = await findAllClientsWithoutSchedule(inputValue);
            const array = result.map((client: IClient & { id: string }) => ({
              label: client.name,
              value: client.id,
            }));
            const values = array.filter((i: { label: string }) =>
              i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(values);
          }, 300);
        }}
        onChange={(value) => setChoosedClient(value)}
        value={choosedClient}
        closeMenuOnSelect={false}
        loadingMessage={() => "Carregando..."}
      />
    </Stack>
  );
}
