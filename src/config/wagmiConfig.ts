import {createConfig} from '@privy-io/wagmi';
import {http} from 'wagmi';
import {anvil, sepolia} from 'viem/chains';

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  },
});