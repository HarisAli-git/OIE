"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dummyFetch } from "../../../lib/dummyApi"; // Adjust path if needed

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... (rest of the state and functions from previous version) ...
  // The JSX for the table etc. also remains the same.
  // Just ensure all interactive parts are handled within this client component.
  // ... (previous CustomersPage content)
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dummyFetch("/api/dummy/customers");
      if (response.ok) {
        const result = await response.json();
        setCustomers(result.data);
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to fetch customers");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await dummyFetch(
          `/api/dummy/customers/${customerId}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          alert("Customer deleted successfully (mock)");
          fetchCustomers();
        } else {
          const errData = await response.json();
          alert(
            `Failed to delete customer: ${errData.message || "Unknown error"}`
          );
        }
      } catch (err) {
        alert("An error occurred while deleting the customer.");
        console.error(err);
      }
    }
  };

  if (loading) return <p className="text-center py-4">Loading customers...</p>;
  if (error)
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Customers</h1>
        <Link href="/dashboard/customers/new">
          <span className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-150">
            Add New Customer
          </span>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            {/* ... table headers ... */}
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Docs URL</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {customers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {customer.id}
                </td>
                <td className="py-3 px-6 text-left">{customer.type}</td>
                <td className="py-3 px-6 text-left">
                  {customer.docs_url ? (
                    <a
                      href={customer.docs_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 truncate max-w-xs inline-block"
                    >
                      {customer.docs_url}
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <Link href={`/dashboard/customers/${customer.id}`}>
                    <span className="text-blue-500 hover:text-blue-700 mr-3 cursor-pointer font-medium">
                      Edit
                    </span>
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
