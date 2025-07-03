import type {PrivyClientConfig} from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
    appearance: {
        walletChainType: 'ethereum-only',
        walletList: ['metamask', 'rainbow', 'wallet_connect'],
    },
    embeddedWallets: {
      ethereum: {
        createOnLogin: 'users-without-wallets'
      }
    },
    supportedChains: [
      {
        id: 31337,
        name: 'Anvil Local',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        rpcUrls: {
          default: {
            http: ['http://127.0.0.1:8545']
          }
        }
      }
    ],
    defaultChain: {
      id: 31337, // Chain ID padrão do Anvil/Hardhat
      name: 'Anvil Local',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: {
        default: {
          http: ['http://127.0.0.1:8545']
        }
      }
    }
};
