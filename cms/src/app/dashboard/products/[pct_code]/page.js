"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummyFetch } from "../../../lib/dummyApi";
import ProductForm from "../../../../components/product/form";

export default function EditProductPage() {
  const router = useRouter();
  const { pct_code } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (pct_code) {
      setLoading(true);
      setError(null);
      const fetchProduct = async () => {
        try {
          const response = await dummyFetch(`/api/dummy/products/${pct_code}`);
          if (response.ok) {
            const result = await response.json();
            setProduct(result.data);
          } else {
            const errData = await response.json();
            setError(
              errData.message || `Product with code ${pct_code} not found.`
            );
          }
        } catch (err) {
          setError("An unexpected error occurred while fetching product data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [pct_code]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // pct_code is part of formData from ProductForm but disabled for editing; it's used in URL.
      // The PUT request body might not need pct_code if it's implied by the URL.
      // However, our dummyFetch PUT for products expects it in the body for merging.
      const payload = { ...formData, pct_code: parseInt(pct_code) };

      const response = await dummyFetch(`/api/dummy/products/${pct_code}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert("Product updated successfully (mock)!");
        router.push("/dashboard/products");
      } else {
        const errData = await response.json();
        setSubmitError(errData.message || "Failed to update product.");
        alert(
          `Failed to update product: ${errData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitError("An unexpected error occurred.");
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center py-4">Loading product data...</p>;
  if (error)
    return (
      <p className="text-center py-4 text-red-500">
        Error: {error}{" "}
        <Link href="/dashboard/products">
          <span className="text-indigo-600 hover:underline">
            Go back to products list.
          </span>
        </Link>
      </p>
    );
  if (!product)
    return (
      <p className="text-center py-4">
        Product not found.{" "}
        <Link href="/dashboard/products">
          <span className="text-indigo-600 hover:underline">
            Go back to products list.
          </span>
        </Link>
      </p>
    );

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/products">
          <span className="text-indigo-600 hover:text-indigo-800">
            &larr; Back to Products
          </span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Edit Product (Code: {pct_code})
      </h1>
      {submitError && (
        <p className="text-red-500 bg-red-100 p-3 rounded mb-4">
          {submitError}
        </p>
      )}
      <ProductForm
        onSubmit={handleSubmit}
        initialData={product}
        isEditing={true}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
