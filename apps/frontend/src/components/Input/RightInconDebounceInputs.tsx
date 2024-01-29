import { CheckboxIcon, Spinner } from "@chakra-ui/react";

import { useGeneralContext } from "../../context/globalProvider";

export function RightIconDebounceInputs() {
  const { start, isFetching } = useGeneralContext();
  if (!start) return null;
  if (isFetching) return <Spinner boxSize=".8rem" />;
  return <CheckboxIcon color="green.400" />;
}
