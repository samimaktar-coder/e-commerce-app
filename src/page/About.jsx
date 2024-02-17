import React from "react";
import useIsLogin from "../hooks/useIsLogin";
import Button from "../components/Button";

function About() {
  useIsLogin();

  return (
    <div className='text-center py-10 w-3/5 mx-auto'>
      <h1 className='text-4xl fonbo mb-5'>
        WE LOVE <span className='text-teal-500'>MEGA</span>STORE
      </h1>
      <p className='text-lg mb-10'>
        Welcome to our e-commerce haven, where convenience meets quality and
        indulgence is just a click away. Dive into a world of endless
        possibilities as you explore our meticulously curated selection of
        products, carefully sourced to cater to your every need and desire.
        Whether you're seeking fashion-forward attire to elevate your style,
        cutting-edge gadgets to streamline your life, or artisanal goods to
        savor life's little luxuries, our platform offers an unparalleled
        shopping experience tailored just for you. With user-friendly
        navigation, secure transactions, and prompt delivery, we strive to
        exceed your expectations every step of the way. Embrace the future of
        shopping with us, where satisfaction is guaranteed and your journey to
        discovery begins with the tap of a button.
      </p>
      <Button title='Continue Shopping' link='/' />
    </div>
  );
}

export default About;
