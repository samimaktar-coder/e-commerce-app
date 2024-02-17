import React, { useEffect, useState } from "react";
import Button from "./Button";

function SearchBox({ products, setFilteredProducts }) {
  const [inputText, setInputText] = useState("");
  const [sortBy, setSortBy] = useState("htl");
  const [priceRange, setPriceRange] = useState(2000);

  useEffect(() => {
    setFilteredProducts((products) => {
      return products.sort((a, b) => b.price - a.price);
    });
  }, []);

  const searchProducts = (text) => {
    if (!text) return setFilteredProducts(products);
    let newArr = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text)
      );
    });

    setFilteredProducts(newArr);
  };

  const sortProducts = (sortValue) => {
    if (sortValue === "htl") {
      setFilteredProducts((products) => {
        return products.sort((a, b) => b.price - a.price);
      });
    } else if (sortValue === "lth") {
      setFilteredProducts((products) => {
        return products.sort((a, b) => a.price - b.price);
      });
    }
  };

  const priceRangeProducts = (priceRange) => {
    // if (priceRange === 0) return setFilteredProducts(products);
    setFilteredProducts((products) => {
      return products.filter((product) => Number(product.price) <= priceRange);
    });
  };

  const finalSearch = (text, sortValue, priceRange) => {
    searchProducts(text);
    sortProducts(sortValue);
    priceRangeProducts(priceRange);
  };

  return (
    <div className='bg-[#15161e] mx-12 p-5 rounded-lg mt-10 mb-5'>
      <div className='grid items-center grid-cols-3 gap-10 max-md:grid-cols-1'>
        <div>
          <p className='mb-1'>Search Product:</p>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className='bg-[#272935] h-8 border border-gray-400 px-2 rounded-lg outline-none w-full'
          />
        </div>
        <div>
          <p className='mb-1'>Sort By Price:</p>
          <select
            name=''
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='bg-[#272935] w-full h-8 border border-gray-400 px-2 rounded-lg outline-none'
          >
            {/* <option value=''>Default</option> */}
            <option value='htl'>High to low</option>
            <option value='lth'>Low to high</option>
          </select>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <p>Price</p>
            <p className='font-semibold'>${priceRange}</p>
          </div>
          <input
            type='range'
            max={2000}
            min={0}
            step={5}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className='w-full h-8 border border-gray-400 px-2 rounded-lg outline-none accent-[#272935]'
          />
        </div>
      </div>
      <div className='flex items-center justify-center mt-10 gap-x-6'>
        <Button
          title='Search'
          onClick={() => finalSearch(inputText, sortBy, priceRange)}
        />
        <Button
          title='Reset'
          onClick={() => {
            finalSearch("", "", 2000);
            setInputText("");
            setPriceRange(2000);
            setSortBy("");
          }}
        />
      </div>
    </div>
  );
}

export default SearchBox;
