// components/layout/Layout.js
"use client";

import Sidebar from "./sidebar";
import Header from "./header";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children, pageTitle }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated && router.pathname !== "/login") {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback, render nothing or a loading indicator
    // to prevent flashing unauthenticated content.
    return null;
  }

  if (router.pathname === "/login") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
