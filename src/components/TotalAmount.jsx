import React, { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";

function TotalAmount() {
  const cartData = useSelector((state) => state.cart);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div className='bg-black/25 p-8 rounded-xl'>
        <div className='flex items-center justify-between border border-transparent border-b-black py-2'>
          <h2 className='text-sm font-semibold'>Subtotal</h2>
          <h2 className='text-sm font-semibold'>$ {cartData.cartTotal}</h2>
        </div>
        <div className='flex items-center justify-between border border-transparent border-b-black py-2'>
          <h2 className='text-sm font-semibold'>Shipping</h2>
          <h2 className='text-sm font-semibold'>
            ${" "}
            {cartData.cartTotal < 10000 && cartData.cartTotal > 0
              ? cartData.shipping
              : 0}
          </h2>
        </div>
        <div className='flex items-center justify-between border border-transparent border-b-black py-2'>
          <h2 className='text-sm font-semibold'>Tax</h2>
          <h2 className='text-sm font-semibold'>
            $ {(cartData.cartTotal * 0.06).toFixed(2)}
          </h2>
        </div>
        <div className='flex items-center justify-between pt-6'>
          <h2 className='text-sm font-semibold'>Order Total</h2>
          <h2 className='text-sm font-semibold'>
            ${" "}
            {cartData.totalPrice +
              Number((cartData.cartTotal * 0.06).toFixed(2))}
          </h2>
        </div>
      </div>
      <Button
        title='Place Order'
        className='mt-8 block text-center'
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-screen bg-black/25 backdrop-blur-sm  p-10 rounded-xl text-center'>
          <div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/85 w-3/4 p-10 rounded-xl text-center'>
            {cartItems.length ? (
              <div>
                <h1 className='text-3xl mb-3 font-semibold'>
                  Congratulations! Your order has been successfully placed! 🎉
                </h1>
                <h1 className='text-3xl font-semibold'>
                  Stay tuned for exciting updates coming your way soon!
                </h1>
              </div>
            ) : (
              <div>
                <h1 className='text-3xl mb-3 font-semibold'>
                  Your cart is empty.😞
                </h1>
              </div>
            )}
            <Button
              link='/'
              title='Continue Shopping'
              onClick={() => {
                setShowModal(false);
                dispatch(clearCart());
              }}
              className='inline-block mt-10 mx-auto'
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TotalAmount;
