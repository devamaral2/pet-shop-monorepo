import { CheckboxIcon, Spinner } from "@chakra-ui/react";

interface Props {
  loading?: boolean;
}

export function RightIconDebounceInputs({ loading }: Props) {
  if (loading) return <Spinner boxSize=".8rem" />;
  return <CheckboxIcon color="green.400" />;
}
