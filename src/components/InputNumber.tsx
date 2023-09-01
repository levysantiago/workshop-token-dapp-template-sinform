import { Flex, Text, TextField } from "@radix-ui/themes";

interface IInputNumberProps {
  label: string
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

export function InputNumber({ placeholder, value, label, onChange }: IInputNumberProps) {
  return (
    <Flex gap="2" align="start" direction="column">
      <Text
        style={{ color: "#6561d4" }}
        size="1">{label}
      </Text>
      <TextField.Input
        size="3"
        type="number"
        placeholder={placeholder}
        variant="classic"
        radius="full"
        color="purple"
        value={value}
        onChange={onChange}
      />
    </Flex>
  )
}