import { Badge, Box, Button, Flex, Text, } from "@radix-ui/themes"
import { MintSection } from "./sections/mint";
import { BurnSection } from "./sections/burn";
import { TransferSection } from "./sections/transfer";
import { useEffect, useState } from "react";
import TokenRepository from "./repositories/tokenRepository";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState('')
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>()
  const [tokenRepository, setTokenRepository] = useState<TokenRepository | undefined>()

  // Connect wallet to application
  async function connect(): Promise<string[] | undefined> {
    if (window.ethereum) {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[] | undefined

      console.log(accounts)

      if (accounts && accounts.length) {
        setWalletAddress(accounts[0])
      }

      return accounts
    }
  }

  // Get the metamask provider
  function getProvider() {
    if (window.ethereum !== undefined) {
      const windowEthereum: any = window.ethereum
      // Get the provider and signer from the browser window
      const provider = new ethers.providers.Web3Provider(windowEthereum)

      return provider
    }
  }

  // Saving provider in state
  useEffect(() => {
    setProvider(getProvider())
  }, [])

  // If provider exists, initiate the token repository
  useEffect(() => {
    if (provider) {
      const tokenRepository = new TokenRepository(provider)
      setTokenRepository(tokenRepository)
    }
  }, [provider])

  async function fetchBalance() {
    try {
      setBalance("...")
      const _balance = await tokenRepository?.balanceOf(walletAddress)
      setBalance(_balance || "")
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenRepository, walletAddress])

  // If no provider was set, that means metamask is not active or not installed
  if (!provider) {
    return (
      <Box p="9" >
        <header>
          <Flex gap="3" align="center" direction="column" mb="9">
            <Text color="sky" size="9">Install Metamask</Text>
          </Flex>
        </header>
      </Box>
    )
  }

  // Returning the page content
  return (
    <Box p="9" >
      {/* HEADER */}
      <header>
        <Flex gap="3" align="center" direction="column" mb="9">
          <Text color="blue" size="9">Sinform/ERBASE Token DApp</Text>

          {
            walletAddress ?
              <>
                <Text color="cyan" size="4">{walletAddress}</Text>
                <Flex gap="2">
                  <Badge color="blue" size="2">Saldo: {balance || "..."} LTK</Badge>
                </Flex>
              </>
              :
              <Button
                size="3"
                color="blue"
                style={{ cursor: "pointer" }}
                mb="5"
                onClick={connect}
              >
                Connect Wallet
              </Button>
          }

        </Flex>
      </header>

      {/* SECTIONS */}
      <Flex gap="9" align="start" direction="column">
        {/* MINT */}
        <MintSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />

        {/* Burn */}
        <BurnSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />

        {/* Transfer */}
        <TransferSection
          loading={loading}
          setLoading={setLoading}
          tokenRepository={tokenRepository}
          fetchBalance={fetchBalance}
        />
      </Flex >
    </Box>
  );
}

export default App;
