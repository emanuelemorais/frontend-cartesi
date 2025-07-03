import {createConfig} from '@privy-io/wagmi';
import {http} from 'wagmi';
import {anvil, sepolia} from 'viem/chains';

export const wagmiConfig = createConfig({
  chains: [anvil, sepolia],
  transports: {
    [anvil.id]: http(),
    [sepolia.id]: http(),
  },
});