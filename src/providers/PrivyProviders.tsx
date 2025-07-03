'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider } from '@privy-io/wagmi';
import { wagmiConfig } from '../config/wagmiConfig';
import { privyConfig } from '../config/privyConfig';
//
import { ProofProvider } from "@vlayer/react";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const appId = "cmciynb0e0194l60mbuhu9dme";

  return (
    <PrivyProvider
      appId={appId}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
        <ProofProvider
            config={{
              proverUrl: import.meta.env.VITE_PROVER_URL,
              wsProxyUrl: import.meta.env.VITE_WS_PROXY_URL,
              notaryUrl: import.meta.env.VITE_NOTARY_URL,
              token: import.meta.env.VITE_VLAYER_API_TOKEN,
            }}
          >
            {children}
          </ProofProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}