// You might want to put this in a file like `app/login/page.jsx` or `components/auth/LoginPage.jsx`
"use client"; // If you need client-side interactivity like form handling state

import { useState } from "react";
import { useRouter } from "next/navigation"; // Or your preferred router

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Example if using Next.js App Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // --- Replace with your actual login logic ---
    console.log("Login attempt with:", { email, password });
    // Example:
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     throw new Error(data.message || 'Login failed');
    //   }
    //   // Handle successful login, e.g., redirect
    //   router.push('/dashboard'); // Redirect to a protected page
    // } catch (err) {
    //   setError(err.message);
    // }
    // --- End of placeholder logic ---

    // Placeholder for demonstration:
    if (email === "user@example.com" && password === "password") {
      alert("Login Successful! (Placeholder)");
      // router.push('/dashboard'); // Uncomment and adjust if you have a dashboard page
    } else {
      setError("Invalid email or password. (Placeholder)");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#" // Replace with your forgot password link
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Not a member?{" "}
          <a
            href="/signup" // Replace with your signup page link
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
