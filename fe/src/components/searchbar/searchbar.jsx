// components/SearchBar.js
import { useState } from 'react';

export default function SearchBar({setSearchQuery}) {
  const [selectedOption, setSelectedOption] = useState('Company');
  const [inputValue, setInputValue] = useState('');

  const placeholderMap = {
    Company: 'Enter The Company',
    Product: 'Enter The Product',
    HSCode: 'Enter The HS Code'
  };

  const handleSearch = () => {
    if (selectedOption === "Company") {
      return
    } else if (selectedOption === "Product") {
      setSearchQuery(`description=${inputValue}`)
    } else {
      setSearchQuery(`pct_code=${inputValue}`)
    }
  }

  return (
    <div className="bg-black text-white p-4 rounded-md mt-10 flex items-center max-w-4xl mx-auto">
      <div className="flex space-x-2 mr-4">
        {['Company', 'Product', 'HSCode'].map(option => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`px-4 py-2 rounded-md font-medium ${selectedOption === option ? 'bg-blue-800 text-white' : 'bg-gray-800 text-gray-300'}`}
          >
            {option}
          </button>
        ))}
      </div>
      <input
        type="text"
        className="flex-grow px-4 py-2 text-black rounded-md mr-4"
        placeholder={placeholderMap[selectedOption]}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-md font-bold">SEARCH</button>
    </div>
  );
}
