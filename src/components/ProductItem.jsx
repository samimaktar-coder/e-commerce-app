import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useIsLogin from "../hooks/useIsLogin";
import Button from "./Button";
import { useOptions } from "../hooks/useOptions";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";

function ProductItem() {
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const { id } = useParams();
  useIsLogin();
  const options = useOptions(15);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/products/` + id).then((res) => {
      setProduct(res.data);
    });
  }, []);

  return (
    product && (
      <div className='px-20'>
        <Link
          to='/'
          className='text-lg hover:underline mb-10  inline-flex items-center'
        >
          Home
          <IoIosArrowForward />
        </Link>
        <div className='grid grid-cols-2 gap-x-8'>
          <div>
            <div className='min-w-full max-h-[32rem] overflow-hidden flex items-center justify-center mb-5 rounded-2xl'>
              <img
                src={product.images[imgIndex]}
                alt={product.title}
                className='min-w-full min-h-full'
              />
            </div>
            <div
              className={`grid grid-cols-3 items-center justify-between gap-3`}
            >
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className='overflow-hidden cursor-pointer min-w-40 max-h-32 flex items-center justify-center rounded-lg'
                >
                  <img
                    src={image}
                    onClick={() => setImgIndex(index)}
                    className='min-w-full min-h-full'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-10'>
            <h1 className='text-4xl font-semibold'>{product.title}</h1>
            <h3 className='text-lg my-3'>{product.brand}</h3>
            <h3 className='text-lg'>${product.price}</h3>
            <p className='my-4'>{product.description}</p>
            <h3>
              Discount:
              <span className='text-xl text-yellow-500 ml-2'>
                {product.discountPercentage}%
              </span>
            </h3>
            <div className='mt-5 mb-10'>
              <h2 className='mb-2'>Quantity:</h2>
              <select
                value={productCount}
                onChange={(e) => setProductCount(e.target.value)}
                className='bg-[#272935] w-1/2 h-12 border border-gray-400 px-2 rounded-lg outline-none'
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {product.stock === 0 && (
              <h3 className='mb-5 flex items-center gap-x-1 text-red-500'>
                <AiOutlineExclamationCircle />
                <span>Out of stock</span>
              </h3>
            )}
            <Button
              title='Add to cart'
              onClick={() =>
                dispatch(addItem({ product: product, quantity: productCount }))
              }
              className='inline-block'
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ProductItem;
