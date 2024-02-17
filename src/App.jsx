import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./page/Home";
import About from "./page/About";
import Cart from "./page/Cart";
import ProductItem from "./components/ProductItem";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.login.value);

  return (
    <div className='min-h-screen bg-[#272935] text-white'>
      <Header />
      <div className='py-32'>
        <Routes>
          {isLogin ? (
            <Route path='/' element={<Home />} />
          ) : (
            <Route path='/' element={<Login />} />
          )}
          <Route path='/product/:id' element={<ProductItem />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
