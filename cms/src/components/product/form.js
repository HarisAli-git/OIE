// components/product/ProductForm.js
"use client";

import { useState, useEffect } from "react";
import * as Yup from "yup";
import { dummyFetch, mockCategoriesData } from "../../lib/dummyApi"; // Using mockCategoriesData directly for simplicity

const productSchema = Yup.object().shape({
  pct_code: Yup.number()
    .typeError("Product code must be a number")
    .integer("Product code must be an integer")
    .required("Product code is required")
    .min(1, "Product code must be positive"),
  category_id: Yup.number()
    .typeError("Category must be selected")
    .required("Category is required")
    .positive("Category must be selected"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
  cd_percentage: Yup.number()
    .typeError("CD Percentage must be a number")
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot exceed 100")
    .nullable(),
});

export default function ProductForm({
  onSubmit,
  initialData = {},
  isEditing = false,
  isSubmitting,
}) {
  const [pctCode, setPctCode] = useState(initialData.pct_code || "");
  const [categoryId, setCategoryId] = useState(initialData.category_id || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [cdPercentage, setCdPercentage] = useState(
    initialData.cd_percentage !== undefined ? initialData.cd_percentage : ""
  ); // Handle 0 or null

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // In a real app, fetch categories from API:
    // dummyFetch('/api/dummy/categories')
    //   .then(res => res.json())
    //   .then(data => setCategories(data.data || []))
    //   .catch(err => console.error("Failed to fetch categories", err));
    setCategories(mockCategoriesData); // Using static mock for now
  }, []);

  useEffect(() => {
    setPctCode(initialData.pct_code || "");
    setCategoryId(initialData.category_id || "");
    setDescription(initialData.description || "");
    setCdPercentage(
      initialData.cd_percentage !== undefined ? initialData.cd_percentage : ""
    );
    setErrors({});
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = {
      pct_code: pctCode ? parseInt(pctCode) : undefined,
      category_id: categoryId ? parseInt(categoryId) : undefined,
      description,
      cd_percentage: cdPercentage !== "" ? parseFloat(cdPercentage) : null, // Handle empty string for optional field
    };

    try {
      await productSchema.validate(formData, { abortEarly: false });
      onSubmit(formData);
    } catch (err) {
      if (err.inner) {
        const yupErrors = {};
        err.inner.forEach((error) => {
          yupErrors[error.path] = error.message;
        });
        setErrors(yupErrors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      noValidate
    >
      <div>
        <label
          htmlFor="pct_code"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Code (PCT) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="pct_code"
          id="pct_code"
          value={pctCode}
          onChange={(e) => setPctCode(e.target.value)}
          disabled={isEditing}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.pct_code ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            isEditing ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
        {errors.pct_code && (
          <p className="text-xs text-red-600 mt-1">{errors.pct_code}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="category_id"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category_id"
          id="category_id"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.category_id ? "border-red-500" : "border-gray-300"
          } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="text-xs text-red-600 mt-1">{errors.category_id}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        ></textarea>
        {errors.description && (
          <p className="text-xs text-red-600 mt-1">{errors.description}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="cd_percentage"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          CD Percentage (e.g., 10.50)
        </label>
        <input
          type="number"
          name="cd_percentage"
          id="cd_percentage"
          step="0.01"
          value={cdPercentage}
          onChange={(e) => setCdPercentage(e.target.value)}
          placeholder="e.g. 5.25 for 5.25%"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors.cd_percentage && (
          <p className="text-xs text-red-600 mt-1">{errors.cd_percentage}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Update Product"
            : "Add Product"}
        </button>
      </div>
    </form>
  );
}
