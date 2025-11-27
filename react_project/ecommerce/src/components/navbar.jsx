import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "../assets/navbar/cart.png";
import acc from "../assets/navbar/acc.png";
import UserContext from "../contexts/UserContext";
import api from "../api/api";

function Navbar() {
  const  user = localStorage.getItem("userId")
  const navigate = useNavigate(); 

  const handleLogout = async () => {
   const get = api.post("/logout")
   localStorage.clear()
   window.location.reload()

   function orderview (){
    navigate("/orders")
   }
   
  };

  return (
    <div className="flex bg-white justify-center w-full h-[10vh] text-[#07484A] shadow-md">
      <div className="w-[30%] h-[10vh] pl-[100px] flex items-center">
        <h1 className="text-xl font-bold">YOUR STORE</h1>
      </div>
      <div className="w-[40%] h-[10vh] flex items-center justify-around">
        <ul className="flex space-x-8">
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/products" className="hover:text-blue-600">PRODUCTS</Link></li>
          <li><Link to="/category">CATEGORY</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
        </ul>
      </div>
      <div className="w-[30%] h-[10vh] flex items-center justify-end pr-[100px]">
        <Link to="/orders" >
        <img src={acc} alt="account" className="w-[28px] mr-5" />
        </Link>
        {user && (
            <>
             <Link to="/cart">
          <img src={cart} alt="cart" className="w-[30px] mr-5 cursor-pointer" />
        </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
