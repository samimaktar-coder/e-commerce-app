import React from "react";
import { Link } from "react-router-dom";

function Button({ title, link = "", onClick = () => {}, className = "" }) {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`bg-teal-500 hover:bg-teal-600 text-black text-lg font-semibold px-4 py-2 rounded-md ${className}`}
    >
      {title}
    </Link>
  );
}

export default Button;
