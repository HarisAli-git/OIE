// pages/_app.js
import "../styles/globals.css"; // Ensure this path is correct
import { AuthProvider } from "../contexts/auth";
import Layout from "../components/layout/layout"; // Import the main layout
import { useRouter } from "next/router";

function Home({ Component, pageProps }) {
  const router = useRouter();
  // Determine page title (can be more sophisticated)
  const pageTitle =
    router.pathname.split("/").pop().replace("-", " ") || "Home";
  const capitalizedTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <AuthProvider>
      {/* Conditionally render Layout to exclude it on the login page if it has its own simpler layout */}
      {router.pathname === "/login" ? (
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
