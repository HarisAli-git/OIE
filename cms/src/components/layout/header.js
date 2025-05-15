// components/layout/Header.js
import { useAuth } from "../../contexts/auth";

export default function Header({ pageTitle }) {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-700">
        {pageTitle || "Dashboard"}
      </h2>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-150"
      >
        Logout
      </button>
    </header>
  );
}
