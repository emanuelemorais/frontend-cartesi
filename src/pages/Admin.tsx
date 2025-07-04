import { FC, useEffect } from "react";
import { useWallets, useLogout } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";

const userRoles: Record<string, "admin" | "investidor" | "creator"> = {
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266": "admin",
  "0xinvestorwallet": "investidor",
  "0xcreatorwallet": "creator",
};

const Admin: FC = () => {
  const { wallets } = useWallets();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const userAddress = wallets?.[0]?.address?.toLowerCase();
  const isAdmin = userAddress && userRoles[userAddress] === "admin";

  useEffect(() => {
    if (!isAdmin) {
      logout().then(() => {
        navigate("/login", { replace: true });
      });
    }
  }, [isAdmin, logout, navigate]);

  // Bloqueio de navegação para outras páginas pode ser feito nas outras páginas também, usando a mesma lógica

  if (!isAdmin) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Admin;
