"use client"; // This layout handles auth and uses hooks

import Sidebar from "../../components/layout/sidebar";
import Header from "../../components/layout/header";
import { useAuth } from "../../contexts/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback to prevent flashing unauthenticated content.
    // It's better if the redirect in useEffect is quick.
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Redirecting to login...
      </div>
    );
  }

  // Generate a page title from the current path segment
  // e.g., /dashboard/customers/new -> New
  // e.g., /dashboard/customers -> Customers
  const segments = pathname.split("/").filter(Boolean);
  let title = "Dashboard";
  if (segments.length > 1) {
    title = segments[segments.length - 1];
    if (title === "[id]" || title === "[pct_code]") {
      // If it's a dynamic segment page
      title = `Edit ${segments[segments.length - 2].slice(0, -1)}`; // e.g. Edit Customer
    } else if (segments.includes("new") && segments.length > 2) {
      title = `New ${segments[segments.length - 2].slice(0, -1)}`;
    }
    title = title.charAt(0).toUpperCase() + title.slice(1).replace("-", " ");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header pageTitle={title} />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
