import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../Components/User/Home/Header";
import HomePage from "../../Pages/User/HomePage/HomePage";
import Footer from "../../Components/User/Home/Footer";

function UserRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoute;
