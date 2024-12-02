'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ShopSidebar() {
  // State for category selection
  const [selectedCategory, setSelectedCategory] = useState(null);
  // State for price filter
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

  // Handle category selection
  const handleCategorySelect = (category:any) => {
    setSelectedCategory(category);
  };

  // Handle price range change
  const handlePriceChange = (event:any) => {
    setPriceRange(event.target.value.split(',').map(Number));
  };

  return (
    <motion.section
      animate={{ opacity: 1 }}
      className="p-4 dark:bg-slate-600/25 bg-gray-100 shadow-lg rounded-lg w-64"
      initial={{ opacity: 0 }}
      transition={{
        opacity: { duration: 1.5 },
        ease: 'easeInOut',
      }}
    >
      {/* Sidebar Header */}
      <motion.h2
        animate={{ opacity: 1 }}
        className="text-[12px] font-semibold mb-4"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Products Categories
      </motion.h2>

      {/* Categories List */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mb-6"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h3 className="font-semibold text-[12px] mb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <motion.li
              key={index}
              className={`cursor-pointer text-[12px] p-2 rounded-md ${
                selectedCategory === category ? 'bg-sky-700 text-white' : 'bg-white text-gray-700'
              } transition duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Price Range Filter */}
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-6"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h3 className="font-semibold text-[12px] mb-2">Price Range</h3>
        <input
          className="w-full mb-4"
          max="1000"
          min="0"
          step="10"
         
          type="range"
          onChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
