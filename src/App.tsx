import { Box, Button, Flex, Text, } from "@radix-ui/themes"
import { useState } from "react";
import { MintSection } from "./sections/mint";
import { BurnSection } from "./sections/burn";
import { TransferSection } from "./sections/transfer";

function App() {
  const [loading, setLoading] = useState(false)

  // Returning the page content
  return (
    <Box p="9" >
      {/* HEADER */}
      <header>
        <Flex gap="3" align="center" direction="column" mb="9">
          <Text color="blue" size="9">Sinform Token DApp</Text>

          {/* CONNECT WALLET BUTTON */}
          <Button
            size="3"
            color="blue"
            style={{ cursor: "pointer" }}
            mb="5"
          >
            Connect Wallet
          </Button>
        </Flex>
      </header>

      {/* SECTIONS */}
      <Flex gap="9" align="start" direction="column">
        {/* MINT */}
        <MintSection
          loading={loading}
          setLoading={setLoading}
        />

        {/* Burn */}
        <BurnSection
          loading={loading}
          setLoading={setLoading}
        />

        {/* Transfer */}
        <TransferSection
          loading={loading}
          setLoading={setLoading}
        />
      </Flex >
    </Box >
  );
}

export default App;
