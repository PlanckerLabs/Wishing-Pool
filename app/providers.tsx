"use client";

import { ThemeProvider } from "next-themes";
import { goerli, sepolia } from 'wagmi/chains'
import { WagmiConfig, createClient, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'


import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: 'HWqVSw02RgUcvkTMrVq39hQqG5iticAV' }), publicProvider()],
)

// Set up client
const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true, UNSTABLE_shimOnConnectSelectAccount: true, } }),
  ],
  provider,
})
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </WagmiConfig>

  );
}
