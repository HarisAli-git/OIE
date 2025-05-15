// app/page.js
"use client";

import { AuthProvider } from "../contexts/auth";
import Layout from "../components/layout/layout"; // Import the main layout
import { usePathname } from "next/navigation";

function Home({ Component, pageProps }) {
  const pathname = usePathname();
  const pageTitle = pathname?.split("/").pop().replace("-", " ") || "Home";
  const capitalizedTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <AuthProvider>
      {/* Conditionally render Layout to exclude it on the login page if it has its own simpler layout */}
      {pathname === "/login" ? (
        <Layout pageTitle="Login">
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Layout pageTitle={capitalizedTitle}>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthProvider>
  );
}

export default Home;
