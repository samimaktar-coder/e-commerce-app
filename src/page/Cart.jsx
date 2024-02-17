import React from "react";
import useIsLogin from "../hooks/useIsLogin";
import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import TotalAmount from "../components/TotalAmount";
import Button from "../components/Button";

function Cart() {
  useIsLogin();
  const cartData = useSelector((state) => state.cart);
  return (
    <div className='px-20 my-10 max-sm:px-10'>
      <h1 className='text-3xl border-2 border-b-black border-transparent h-12 mb-10'>
        Shopping Cart
      </h1>
      <div className='flex gap-5 justify-between max-xl:flex-col'>
        <div className='basis-[65%]'>
          {cartData.cartItems.length !== 0 ? (
            <CartItems cartItems={cartData.cartItems} />
          ) : (
            <div className='text-center'>
              <h1 className='text-3xl mb-3'>Your cart is empty.😞</h1>
              <Button
                title='Go to Products'
                className='inline-block'
                link='/'
              />
            </div>
          )}
        </div>
        <div className='basis-[30%]'>
          <TotalAmount />
        </div>
      </div>
    </div>
  );
}

export default Cart;
