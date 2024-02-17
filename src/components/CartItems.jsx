import React from "react";
import CartItem from "./CartItem";

function CartItems({ cartItems }) {
  return (
    <div className='flex flex-col gap-y-4'>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CartItems;
