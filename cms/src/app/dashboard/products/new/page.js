"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dummyFetch } from "../../../lib/dummyApi";
import ProductForm from "../../../../components/product/form";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Ensure pct_code is unique - the dummyAPI POST might handle this
      const response = await dummyFetch("/api/dummy/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Product added successfully (mock)!");
        router.push("/dashboard/products");
      } else {
        const errData = await response.json();
        setSubmitError(errData.message || "Failed to add product.");
        alert(`Failed to add product: ${errData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitError("An unexpected error occurred.");
      alert("An error occurred while adding product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/products">
          <span className="text-indigo-600 hover:text-indigo-800">
            &larr; Back to Products
          </span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>
      {submitError && (
        <p className="text-red-500 bg-red-100 p-3 rounded mb-4">
          {submitError}
        </p>
      )}
      <ProductForm
        onSubmit={handleSubmit}
        isEditing={false}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
