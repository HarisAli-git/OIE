import React, { useState } from "react";
import Select from "react-tailwindcss-select";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { value: "technology", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
  ];

  const handleChange = (value) => {
    setSelectedCategory(value);
    console.log("Selected category:", value);
    // Implement any additional logic here, such as routing or fetching data based on the selected category
  };

  return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <div className="p-8 bg-white shadow-lg rounded-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Select a Category</h1>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          options={categories}
          placeholder="Choose a category"
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-600 border border-gray-300 rounded-lg shadow-sm transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-100"
                  : "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
              }`,
            menu: "absolute z-10 w-full bg-white shadow-lg border border-gray-200 mt-1 rounded-lg",
            listItem: ({ isSelected }) =>
              `block transition duration-200 px-4 py-2 cursor-pointer select-none truncate rounded ${
                isSelected
                  ? "text-white bg-blue-500"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`,
          }}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
