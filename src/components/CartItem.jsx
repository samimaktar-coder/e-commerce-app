import React, { useState } from "react";
import { useOptions } from "../hooks/useOptions";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../store/cartSlice";
import { Link } from "react-router-dom";

function CartItem({ item }) {
  const [productCount, setProductCount] = useState(item.quantity);
  const options = useOptions(15);
  const dispatch = useDispatch();
  return (
    <div
      key={item.id}
      className='border-2 border-transparent border-b-black grid grid-cols-6 gap-x-5 px-3 py-5'
    >
      <Link
        to={`/product/${item.id}`}
        className='w-28 h-24 rounded-md overflow-hidden flex items-center justify-center'
      >
        <img src={item.thumbnail} alt='' className='min-h-full min-w-full' />
      </Link>
      <div className='col-span-2'>
        <h3 className='font-semibold'>{item.title}</h3>
        <h3 className='flex items-center gap-x-2 text-sm'>
          <span>{item.brand}</span>
          <span>|</span>
          <span>{item.category}</span>
        </h3>
      </div>
      <div>
        <h2>Quantity:</h2>
        <select
          value={productCount}
          onChange={(e) => {
            setProductCount(e.target.value);
            dispatch(editItem({ id: item.id, quantity: e.target.value }));
          }}
          className='bg-[#272935] w-20 h-8 border border-gray-400 px-2 rounded-lg outline-none'
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          className='text-red-500 text-sm mt-3'
          onClick={() => dispatch(removeItem(item.id))}
        >
          Remove
        </button>
      </div>
      <div>
        <h2>Total Price:</h2>
        <h2>$ {item.price * item.quantity}</h2>
      </div>
    </div>
  );
}

export default CartItem;
