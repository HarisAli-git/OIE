"use client";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-xl text-center">
          <h1 className="text-2xl font-bold mb-6">
            Are you a User or a Customer?
          </h1>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => router.push("/user")}
            >
              User
            </button>
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => router.push("/customer")}
            >
              Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
