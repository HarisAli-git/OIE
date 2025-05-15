// components/layout/Sidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard Home" },
  { href: "/dashboard/customers", label: "Customers" },
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/suppliers", label: "Suppliers" },
  { href: "/dashboard/categories", label: "Categories" },
  { href: "/dashboard/origins", label: "Origins" },
  { href: "/dashboard/products", label: "Products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">CMS Panel</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-2">
              <Link href={item.href}>
                <span
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))
                      ? "bg-gray-700 font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
