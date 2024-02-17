import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/products`).then((res) => {
      setProducts(res.data.products);
      setFilteredProducts(res.data.products.sort((a, b) => b.price - a.price));
    });
  }, []);

  return (
    <>
      {products.length !== 0 && (
        <div>
          <h1 className='text-3xl text-center mt-5'>All Products</h1>
          <SearchBox
            products={products}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
          <div className='grid grid-cols-3 gap-6 px-12 py-5'>
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className='p-5 bg-[#2f3343] shadow-xl rounded-lg'
              >
                <div className='h-56 rounded-lg overflow-hidden flex items-center justify-center'>
                  <img
                    src={product.thumbnail}
                    alt={`${product.title}-img`}
                    className='min-h-full hover:scale-105 transition-all'
                  />
                </div>
                <div className='flex items-center justify-between my-3 gap-x-10'>
                  <h2 className='text-lg font-semibold'>{product.title}</h2>
                  <h3 className='font-semibold'>${product.price}</h3>
                </div>
                <div className='flex items-center gap-x-2 mb-3'>
                  <IoStar className='text-yellow-500 text-xl' />
                  <h3>{product.rating}</h3>
                </div>
                <div className='flex items-center justify-between'>
                  <Button
                    title='Add to cart'
                    onClick={() => dispatch(addItem({ product: product }))}
                  />
                  <h3 className='text-sm'>
                    <span className='text-yellow-500 font-semibold text-lg mr-1'>
                      {product.discountPercentage} %
                    </span>
                    OFF
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;