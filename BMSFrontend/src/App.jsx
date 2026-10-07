import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import CustomerDashboard from "./components/CustomerDashboard.jsx";
import DepositPage from "./components/DepositPage.jsx";
import Withdraw from "./components/Withdraw.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/deposit" element={<DepositPage />}></Route>
          <Route path="/withdraw" element={<Withdraw />}></Route>
          <Route path="/transactions" element={<TransactionHistory />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
