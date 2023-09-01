import { useState } from "react"
import { Button, Flex, Text } from "@radix-ui/themes"
import { InputNumber } from "../components/InputNumber"

interface IBurnProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function BurnSection({ loading, setLoading, }: IBurnProps) {
  const [burnAmount, setBurnAmount] = useState("")

  return (
    <section id="#burn">
      <Flex gap="3" align="start" direction="column">
        <Text style={{ color: "#fafafa" }} size="5">🔥 Burn Token</Text>
        <Flex gap="3" align="end">
          <InputNumber
            label="Amount"
            placeholder="100"
            value={burnAmount}
            onChange={(event) => { setBurnAmount(event.target.value) }}
          />
          <Button
            size="3"
            color="red"
            style={{ cursor: "pointer" }}
          >
            {loading ? "..." : "Burn"}
          </Button>
        </Flex>
      </Flex>
    </section>
  )
}