import { usePrivy } from "@privy-io/react-auth";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from '@privy-io/react-auth';

type Role = "admin" | "investidor" | "creator";

interface SidebarProps {
  role: Role;
}

const sidebarOptions: Record<Role, { label: string; path: string }[]> = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Usuários", path: "/admin/users" }
  ],
  investidor: [
    { label: "Investimentos", path: "/investidor" },
    { label: "Carteira", path: "/investidor/carteira" },
  ],
  creator: [
    { label: "Projetos", path: "/creator" },
    { label: "Recebíveis", path: "/creator/recebiveis" },
  ],
};

const Sidebar: FC<SidebarProps> = ({ role }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const options = sidebarOptions[role];

  return (
    <aside className="w-56 bg-white shadow-md h-screen flex flex-col py-8 px-4">
      <h1>AAA</h1>

      <h2 className="text-xl font-bold mb-8 capitalize">{role}</h2>
      <nav className="flex flex-col justify-between gap-4 h-full">
        <div>
          {options.map((opt) => (
            <button
              key={opt.path}
              className="text-left px-4 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => navigate(opt.path)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          className="text-left px-4 py-2 rounded hover:bg-gray-100 transition text-red-500 mt-8 "
          onClick={async () => {
            await logout();
            navigate('/login', { replace: true });
          }}
        >
          Logout
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar; 