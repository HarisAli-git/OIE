"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/index";
import SearchBar from "@/components/searchbar/searchbar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetchProducts(currentPage, limit)
      .then((data) => {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen p-6">
      <SearchBar />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length > 0 ? (
          <>
            <ul className="space-y-4 mb-6">
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

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
