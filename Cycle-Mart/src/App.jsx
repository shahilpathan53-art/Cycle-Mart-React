import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ===================== User Components =====================
import Nav from "./components/user/nav";
import Home from "./components/user/home";
import Footer from "./components/user/footer";
import Login from "./components/user/login";
import AboutUs from "./components/user/aboutus";
import ContactUs from "./components/user/contactus";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";
import Signup from "./components/user/Signup";
import ProductPage from "./components/user/ProductPage";
import Buy from "./components/user/Buy";
import Profile from "./components/user/Profile";
import UserOrders from "./components/user/UserOrders";

// ===================== Admin Components =====================
import AdminLogin from "./components/admin/login";
import Dashboard from "./components/admin/Dashboard";
import Customers from "./components/admin/customers";
import Cycles from "./components/admin/cycles";
import Orders from "./components/admin/orders";
import Suppliers from "./components/admin/suppliers";
import Reports from "./components/admin/reports";
import CustomerBills from "./components/admin/CustomerBills";
import SupplierBills from "./components/admin/SupplierBills";
import DashboardReports from "./components/admin/DashboardReports";
import PurchaseOrders from "./components/admin/PurchaseOrders";
import SupplierPayment from "./components/admin/SupplierPayment"; // 👈 new page
import AdminFeedbacks from "./components/admin/AdminFeedbacks";

// ===================== Supplier Components =====================
import SupLogin from "./components/supplier/login";
import SupDashboard from "./components/supplier/Dashboard";
import SupProducts from "./components/supplier/products";
import SupSales from "./components/supplier/sales";
import SupOrders from "./components/supplier/order";
import SupAddProduct from "./components/supplier/addproduct";
import SalesOrders from "./components/supplier/SalesOrders";
import AdminBills from "./components/supplier/AdminBills"; 


function App() {
  const [cartItems, setCartItems] = useState([]); // Shared cart state

  return (
    <>
      {/* User Navigation always visible */}
      <Nav />

      <Routes>
        {/* ===================== User Routes ===================== */}
        <Route path="/" element={<Home />} />
        <Route
          path="/user/ProductPage"
          element={<ProductPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/Buy"
          element={<Buy cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/orders" element={<UserOrders />} />

        {/* ===================== Admin Routes ===================== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/cycles" element={<Cycles />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/suppliers" element={<Suppliers />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/customer-bills" element={<CustomerBills />} />
        <Route path="/admin/supplier-bills" element={<SupplierBills />} />
        <Route path="/admin/dashboard-reports" element={<DashboardReports />} />
        <Route path="/admin/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/admin/supplier-payments" element={<SupplierPayment />} />
        <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />


        {/* ===================== Supplier Routes ===================== */}
        <Route path="/supplier/login" element={<SupLogin />} />
        <Route path="/supplier/dashboard" element={<SupDashboard />} />
        <Route path="/supplier/products" element={<SupProducts />} />
        <Route path="/supplier/sales" element={<SupSales />} />
        <Route path="/supplier/orders" element={<SupOrders />} />
        <Route path="/supplier/add-product" element={<SupAddProduct />} />
        <Route path="/supplier/sales-orders" element={<SalesOrders />} />
        <Route path="/supplier/bills" element={<AdminBills />} />
      </Routes>

      {/* User Footer always visible */}
      <Footer />
    </>
  );
}

export default App;
