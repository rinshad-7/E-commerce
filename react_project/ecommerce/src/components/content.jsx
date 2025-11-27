import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/navbar/boy.png";
import dude from "../assets/navbar/dud.jpg"
// import coverimg from "../assets/navbar/cover.jpg";
import UserContext from "../contexts/UserContext";


function Content() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId")

  const login = () => {
    navigate("/login");
  };
async function shop (){
  navigate("/products")
}

async function signup (){
  navigate("/register")
}
  return (
    <>
      {!user ? (
        <div className="bg-white h-[90vh] w-full flex items-center justify-center px-6">
          <div className="flex flex-col items-center text-center space-y-6 max-w-md">
            <img
              src={img}
              alt="Ecommerce Illustration"
              className="w-64 h-64 object-contain drop-shadow-md"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Your E-Commerce Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Login or create an account to manage products, orders, and analytics.
            </p>
            <div className="flex space-x-4">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                onClick={login}
              >
                LOGIN
              </button>
              <button onClick={signup} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                SIGNUP
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[90vh] overflow-hidden">
          <img
            src={dude}
            alt="Ecommerce Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Discover Your Perfect Style
            </h1>
            <p className="mt-4 text-md md:text-xl text-gray-200 max-w-2xl">
              Explore the latest trends in fashion, electronics, furniture, and more.
              Quality products at the best prices!
            </p>
            <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg transition-all" onClick={shop} >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
