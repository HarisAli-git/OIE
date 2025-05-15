"use client"; // Add this line

import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "next/navigation"; // Update this import
import * as Yup from "yup";

// Yup validation schema (remains the same)
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in and auth is not loading
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || (!authLoading && isAuthenticated)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
      const success = login(email, password); // AuthContext.login is already a mock
      if (!success) {
        setErrors({ form: "Invalid credentials. Please try again." });
      }
    } catch (err) {
      if (err.inner) {
        const yupErrors = {};
        err.inner.forEach((error) => {
          yupErrors[error.path] = error.message;
        });
        setErrors(yupErrors);
      } else {
        setErrors({ form: "An unexpected error occurred." });
      }
    }
  };

  // The JSX remains largely the same as your previous login page
  // Ensure classNames for error states are correctly applied based on `errors.email`, `errors.password`, `errors.form`
  return (
    // Copied from previous version, ensure it's within a layout or styled appropriately
    // If using `src/app/login/layout.js`, this will be its child.
    // Otherwise, the root layout applies.
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your CMS
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
        {errors.form && (
          <p className="text-sm text-red-600 mb-3 text-center">{errors.form}</p>
        )}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address (admin@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 px-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Password (password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1 px-1">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
