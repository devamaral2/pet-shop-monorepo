import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { StatusEnum } from "@pet-shop/entities/statusenum";
import { statusTranslator } from "../utils/translateStatus";

interface Props {
  state: StatusEnum | (StatusEnum & "all");
  setState: (status: string) => void;
  isHeaderComponent?: boolean;
}

export function StatusMenu({ state, setState, isHeaderComponent }: Props) {
  const getAllStatus = () => {
    const statusArray = Object.values(StatusEnum);
    if (isHeaderComponent) statusArray.push("all" as StatusEnum);
    return statusArray;
  };
  const stateTranslate = statusTranslator(state as StatusEnum & "all");

  return (
    <Stack w="100%">
      <Menu>
        <MenuButton
          _hover={{ borderColor: "green.500" }}
          _placeholder={{ color: "grey.400" }}
          _focus={{ borderColor: "green.600" }}
          color="black"
          backgroundColor="#F3F6F6"
          borderRadius="md"
          as={Button}
          bg={stateTranslate.color}
        >
          {stateTranslate.value}
        </MenuButton>
        <MenuList>
          {getAllStatus().map((status) => (
            <MenuItem onClick={() => setState(status)} key={status}>
              {statusTranslator(status as StatusEnum & "all").value}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Stack>
  );
}
