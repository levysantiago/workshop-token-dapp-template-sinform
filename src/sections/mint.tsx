import { useEffect, useState } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { InputNumber } from "../components/InputNumber";
import { InputText } from "../components/InputText";
import TokenRepository from "../repositories/tokenRepository";

interface IMintProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  tokenRepository: TokenRepository | undefined
  fetchBalance: () => Promise<void>
}

export function MintSection({ loading, setLoading, tokenRepository, fetchBalance }: IMintProps) {
  const [mintAmount, setMintAmount] = useState("")
  const [mintAddress, setMintAddress] = useState("")
  const [totalSupply, setTotalSupply] = useState("")

  async function handleMintSubmit() {
    try {
      setLoading(true)
      const trx = await tokenRepository?.mint(mintAddress, mintAmount)
      await trx?.wait()
      setMintAddress("")
      setMintAmount("")
      await fetchBalance()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function fetchTotalSupply() {
      try {
        setLoading(true)
        const supply = await tokenRepository?.totalSupply()
        setTotalSupply(supply || "")
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchTotalSupply()
  }, [tokenRepository, setLoading])

  return (
    <section id="#mint" >
      <Flex gap="3" align="start" direction="column">
        <Flex gap="3" align="center">
          <Text style={{ color: "#fafafa" }} size="5">💰 Mint Token</Text>
          <Text style={{ color: "#434098" }} size="3">Total Supply: {totalSupply || "..."} LTK</Text>
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
            onClick={handleMintSubmit}
          >
            {loading ? "..." : "Mint"}
          </Button>
        </Flex>
      </Flex>
    </section>
  )
}