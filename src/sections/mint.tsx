import { useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { InputNumber } from "../components/InputNumber";
import { InputText } from "../components/InputText";

interface IMintProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function MintSection({ loading, setLoading }: IMintProps) {
  const [mintAmount, setMintAmount] = useState("")
  const [mintAddress, setMintAddress] = useState("")

  return (
    <section id="#mint" >
      <Flex gap="3" align="start" direction="column">
        <Flex gap="3" align="center">
          <Text style={{ color: "#fafafa" }} size="5">💰 Mint Token</Text>
          <Text style={{ color: "#434098" }} size="3">Total Supply: 100 SINF</Text>
        </Flex>
        {/* Address */}
        <InputText
          label="Address"
          placeholder="0x123..."
          value={mintAddress}
          onChange={(event) => { setMintAddress(event.target.value) }}
        />
        <Flex gap="3" align="end">
          <InputNumber
            label="Amount"
            placeholder="100"
            value={mintAmount}
            onChange={(event) => { setMintAmount(event.target.value) }}
          />
          <Button
            size="3"
            color="blue"
            style={{ cursor: "pointer" }}
          >
            {loading ? "..." : "Mint"}
          </Button>
        </Flex>
      </Flex>
    </section>
  )
}