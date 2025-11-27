import AdminLoginPage from "./admin/adminlogin.jsx"
import Adminnav from "./admin/adminnav.jsx"
import Admin from "./pages/admin.jsx"
import Home from "./pages/home.jsx"
import SignupPage from "./pages/signup.jsx"
import Login from "./pages/userlogin.jsx"
import { Routes,Route } from "react-router-dom"
import ProtectedRoute from "./admin/ProtectedRoute.jsx"
import ProductList from "./components/products.jsx"
import CartPage from "./components/usercart.jsx"
import Userorder from "./components/userorder.jsx"
import CategoryProducts from "./components/userCategory.jsx"
// import Categorylist from "./components/userCategory.jsx"





function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<SignupPage/>}/>
            <Route path="/admin/login" element={<AdminLoginPage/>}/>
            <Route path="/products" element={<ProductList/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/orders" element={<Userorder/>}/>
            {/* <Route path="/category" element={<Categorylist/>}/> */}
             <Route path="/category" element={<CategoryProducts />} />

          
           
<Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <Admin/>
            </ProtectedRoute>
          }
        />

      
    </Routes>
     
    
  )
}

export default App
