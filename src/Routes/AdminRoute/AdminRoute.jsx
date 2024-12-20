import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryManagement from "../../Pages/Admin/Category/CategoryManagement";
import AdminDashboard from "../../Pages/Admin/AdminDashboard";
import AdminLogin from "../../Components/Admin/AdminLogin";
import TutorList from "../../Components/Admin/List/TutorList";
import UserList from "../../Components/Admin/List/UserList"
import AdminCourseList from "../../Components/Admin/List/CourseList";
function AdminRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <Routes>
   
          <Route path="/" element={<AdminLogin/>} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/category" element={<CategoryManagement/>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/tutors" element={<TutorList />} />
          <Route path="/courselist" element={<AdminCourseList/>} />
        
      </Routes>
     
    </div>
  );
}

export default AdminRoute;
