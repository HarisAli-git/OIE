"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/index";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Product List</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.pct_code}
                className="p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                <h2 className="text-xl font-semibold">
                  {product.category_name}
                </h2>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-sm text-gray-500">
                  CD Percentage: {product.cd_percentage}%
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
