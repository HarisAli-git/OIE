"use client";

import { AuthProvider } from "../contexts/auth";
// Import other providers here if you have them

export function Providers({ children }) {
  return (
    <AuthProvider>
      {/* <OtherProvider> */}
      {children}
      {/* </OtherProvider> */}
    </AuthProvider>
  );
}
