import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useUsers from "../hooks/useUsers";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { loginUser } from "../store/loginSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  let user = useUsers();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          username: formData.username,
          password: formData.password,
          // expiresInMins: 60, // optional
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(addUser(response.data));
        dispatch(loginUser());
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    let timerId;
    if (showModal) {
      timerId = setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }

    return () => clearTimeout(timerId);
  }, [showModal]);

  useEffect(() => {}, []);

  return (
    <div>
      <form
        className='mx-auto max-xl:w-1/2 max-sm:w-[90%] bg-gray-700 shadow-md w-1/3 p-5 rounded-lg'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center text-4xl font-semibold mb-5'>Log In</h1>
        <div>
          <p className='text-lg'>Username:</p>
          <input
            type='text'
            value={formData.username}
            name='username'
            className='w-full bg-transparent border border-gray-300 px-2 h-9 rounded-md outline-none'
            placeholder='superman'
            required
            onChange={handleChange}
          />
        </div>
        <div className='mt-5'>
          <p className='text-lg'>Password:</p>
          <span className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name='password'
              className='w-full bg-transparent border border-gray-300 px-2 h-9 rounded-md outline-none'
              required
              placeholder='abc123'
              onChange={handleChange}
            />
            <span
              className='absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-lg'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </span>
        </div>
        <button
          type='submit'
          className='bg-blue-600 mx-auto block mt-10 px-5 py-2 text-lg font-semibold rounded-md hover:bg-blue-700'
        >
          Log in
        </button>
        <p className='text-center mt-2'>
          Don't have an account? <a href='#'>Sign Up</a>
        </p>
      </form>
      <div className='fixed bottom-10 right-10'>
        <span
          className=' text-3xl cursor-pointer'
          onClick={() => setShowModal((prev) => !prev)}
        >
          💡
        </span>
        {showModal && (
          <div className='absolute -top-36 right-3 w-72 bg-yellow-500 text-black font-semibold p-2 rounded-md'>
            This website is created using a demo API, so there are few fixed
            username and password. Eg: <br /> username: '{user.username}',
            <br /> password: '{user.password}',
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
