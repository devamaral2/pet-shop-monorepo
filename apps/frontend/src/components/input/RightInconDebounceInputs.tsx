import { CheckboxIcon, Spinner } from "@chakra-ui/react";

import { useGeneralContext } from "../../context/generalProvider";

export function RightIconDebounceInputs() {
  const { isFetching, isDebouncing } = useGeneralContext();
  if (isFetching || isDebouncing) return <Spinner boxSize=".8rem" />;
  return <CheckboxIcon color="green.400" />;
}
