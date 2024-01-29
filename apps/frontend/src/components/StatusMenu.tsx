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
  return (
    <Stack w="100%">
      <Menu>
        <MenuButton as={Button}>
          {statusTranslator(state as StatusEnum & "all")}
        </MenuButton>
        <MenuList>
          {getAllStatus().map((status) => (
            <MenuItem onClick={() => setState(status)} key={status}>
              {statusTranslator(status as StatusEnum & "all")}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Stack>
  );
}
