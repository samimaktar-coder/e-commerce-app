import React from "react";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/loginSlice";

function Header() {
  const userData = useSelector((state) => state.user.data);
  const isLogin = useSelector((state) => state.login.value);
  const totalCartItems = useSelector((state) => state.cart.numItemsInCart);
  const dispatch = useDispatch();

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      {isLogin && (
        <div className='w-full bg-[#272935] text-white flex justify-end gap-x-10 py-1 px-16'>
          <button
            className='text-sm hover:underline'
            onClick={() => dispatch(logoutUser())}
          >
            Log Out
          </button>
        </div>
      )}
      <div className='h-16 flex items-center justify-between px-12 py-8 bg-[#15161e]'>
        <Link
          to='/'
          className='text-3xl font-semibold bg-teal-500 text-black p-2 w-11 h-11 flex items-center justify-center rounded-md'
        >
          M
        </Link>
        {isLogin && (
          <ul className='flex gap-x-3 items-center'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? "bg-[#2f3343] py-1 px-3 rounded-md" : "py-1 px-3"
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive ? "bg-[#2f3343] py-1 px-3 rounded-md" : "py-1 px-3"
              }
            >
              About
            </NavLink>
            <NavLink
              to='/cart'
              className={({ isActive }) =>
                isActive
                  ? "bg-[#2f3343] py-1 px-3 rounded-md text-2xl relative"
                  : "text-2xl relative py-1 px-3"
              }
            >
              <PiShoppingCartBold />
              {totalCartItems !== 0 && (
                <span className='bg-pink-600 absolute top-0 -right-2 text-[.7rem] h-4 w-6 flex items-center justify-center rounded-full font-semibold'>
                  {totalCartItems}
                </span>
              )}
            </NavLink>
            <NavLink className=' px-4 py-1 rounded-md'>
              <img src={userData.image} alt='' className='w-8 rounded-full' />
            </NavLink>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
