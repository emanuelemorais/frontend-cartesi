import { FC, useState, useEffect } from "react";
import { Network } from "../components/cartesi/Network";
import { Inspect } from "../components/cartesi/Inspect";
import { Input } from "../components/cartesi/Input";
import { Portals } from "../components/cartesi/Portals";
import { Reports } from "../components/cartesi/Reports";
import type { Hex } from "viem";
import { Outputs } from "../components/cartesi/Outputs";
import { usePrivy, useLogin, useLinkAccount, useWallets } from '@privy-io/react-auth';
import { CHAIN_CONFIG } from "../config/chainConfig";
import { CARTESI_CONFIG } from "../config/cartesiConfig";

const Home: FC = () => {
  const [appAddress, setAppAddress] = useState<Hex | undefined>(CARTESI_CONFIG.appAddress);
  const [nodeAddress, setNodeAddress] = useState<string | undefined>(CARTESI_CONFIG.nodeAddress);
  const [chainId, setChainId] = useState<number>(CHAIN_CONFIG.id);
  const [walletAddress, setWalletAddress] = useState<`0x${string}` | undefined>();

  const { ready, authenticated, user, logout } = usePrivy();
  const { login } = useLogin();
  const { linkEmail, linkWallet } = useLinkAccount();
  const { wallets } = useWallets();
  const wallet = wallets[0];


  useEffect(() => {
    if (wallet && wallet.address) {
      setWalletAddress(wallet.address as `0x${string}`);
    }
  }, [wallet]);

  const connect = (chain: number, address: `0x${string}` | undefined) => {
    setChainId(chain);
    setWalletAddress(address);
  };

  const handleAddres = (value: string) => {
    setAppAddress(value as Hex);
  };

  if (!ready) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const disableLogin = !ready || (ready && authenticated);

  if (ready && !authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            disabled={disableLogin}
            onClick={() => login({
              loginMethods: ['wallet', 'email'],
              disableSignup: false
            })}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cartesi DApp</h1>
        <div className="flex items-center gap-4">
          {/* <UserPill size={32} /> */}
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p><strong>Usuário:</strong> {user?.id}</p>
        <p><strong>Carteira:</strong> {user?.wallet?.address}</p>
        <p><strong>Email:</strong> {user?.email?.address}</p>
        <p><strong>Chain:</strong> {CHAIN_CONFIG.name} (ID: {CHAIN_CONFIG.id})</p>
      </div>
      
      <div className="mb-4">
        <button className="bg-blue-500 text-white p-2 rounded-md mr-2" onClick={linkWallet}>
          Link Wallet
        </button>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={linkEmail}>
          Link Email
        </button>
      </div>

      <Network onChange={connect} />
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Configurações da Aplicação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DApp Address:
            </label>
            <input
              type="text"
              value={appAddress}
              onChange={(e) => handleAddres(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Endereço do contrato da aplicação"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Node Address:
            </label>
            <input
              type="text"
              value={nodeAddress}
              onChange={(e) => setNodeAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Endereço do node Cartesi"
            />
          </div>
        </div>
      </div>
      
      {appAddress && nodeAddress && walletAddress ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mt-6">Inspect</h2>
          <Inspect
            chain={chainId}
            appAddress={appAddress}
            nodeAddress={nodeAddress}
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Input</h2>
          <Input
            chain={chainId}
            appAddress={appAddress}
            nodeAddress={nodeAddress}
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Portals</h2>
          <Portals
            chain={chainId}
            appAddress={appAddress}
            nodeAddress={nodeAddress}
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Reports</h2>
          <Reports
            chain={chainId}
            appAddress={appAddress}
            nodeAddress={nodeAddress}
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Outputs</h2>
          <Outputs
            chain={chainId}
            appAddress={appAddress}
            nodeAddress={nodeAddress}
          />
        </>
      ) : (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p>Configure o endereço do DApp e do Node para começar a usar as funcionalidades.</p>
        </div>
      )}
    </div>
  );
};

export default Home; 