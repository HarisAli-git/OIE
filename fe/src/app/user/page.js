"use client";

import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="p-8 bg-white shadow-lg rounded-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, User!</h1>
        <p className="text-gray-600">This is the user dashboard.</p>
        <button
          onClick={() => router.push("/product")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Products Page
        </button>
      </div>
    </div>
  );
}
