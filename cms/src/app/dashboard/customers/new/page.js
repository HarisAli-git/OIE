// pages/dashboard/customers/new.js
import CustomerForm from "../../../components/customer/CustomerForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewCustomerPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    console.log("New Customer Data:", formData);
    // TODO: API call to create a new customer
    // try {
    //   const response = await fetch('/api/customers', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     router.push('/dashboard/customers');
    //   } else {
    //     alert('Failed to add customer');
    //   }
    // } catch (error) {
    //   console.error('Error adding customer:', error);
    //   alert('An error occurred');
    // }
    alert("Mock customer creation. Implement actual API call.");
    router.push("/dashboard/customers"); // Navigate back after mock submission
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/customers">
          <span className="text-indigo-600 hover:text-indigo-800">
            &larr; Back to Customers
          </span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add New Customer
      </h1>
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}
