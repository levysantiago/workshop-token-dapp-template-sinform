import { Button, Flex, Text } from "@radix-ui/themes"
import { useState } from "react"
import { InputText } from "../components/InputText"
import { InputNumber } from "../components/InputNumber"

interface ITransferProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function TransferSection({ loading, setLoading, }: ITransferProps) {
  const [transferAmount, setTransferAmount] = useState("")
  const [transferAddress, setTransferAddress] = useState("")

  return (
    <section id="#transfer">
      <Flex gap="3" align="start" direction="column">
        <Flex gap="3" align="center">
          <Text style={{ color: "#fafafa" }} size="5">🚀 Transfer Token</Text>
        </Flex>
        {/* Address */}
        <InputText
          label="Address"
          placeholder="0x123..."
          value={transferAddress}
          onChange={(event) => { setTransferAddress(event.target.value) }}
        />
        <Flex gap="3" align="end">
          <InputNumber
            label="Amount"
            placeholder="100"
            value={transferAmount}
            onChange={(event) => { setTransferAmount(event.target.value) }}
          />
          <Button
            size="3"
            color="blue"
            style={{ cursor: "pointer" }}
          >
            {loading ? "..." : "Transfer"}
          </Button>
        </Flex>
      </Flex>
    </section>
  )
}