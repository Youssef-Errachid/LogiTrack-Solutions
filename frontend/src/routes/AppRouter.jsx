import {BrowserRouter, Routes,Route} from "react-router-dom";


import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Orders from "../pages/Orders";
import AccessDenied from "../pages/AccessDenied";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import Applayout from "../components/layout/Applayout.jsx";

export default function AppRouter(){
    return (
        <BrowserRouter>
           <Routes>
               <Route path="/" element={<Login/>} />
               <Route path="/register" element={<Register/>} />
               <Route path="/accessDenied" element={<AccessDenied/>} />

               <Route element={<Applayout/>}>
                   <Route path="/dashboard" element={<Dashboard/>} />
                   <Route path="/clients" element={<Clients/>} />
                   <Route path="/orders" element={<Orders/>} />
                   <Route path="/products" element={<Products/>} />
               </Route>

               <Route path="*" element={<NotFound/>} />

           </Routes>
        </BrowserRouter>
    )
}
