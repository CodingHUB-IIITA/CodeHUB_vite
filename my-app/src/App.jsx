import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/signin";
import SignupForm from "./Auth/signup";

import { useUserData } from "./Context/user.jsx";
import "./App.css"
import UserProfile from "./pages/UserProfile.jsx";
import Layout from "./Components/Layout.jsx";
import BlogsList from "./pages/Blogs.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Blogs from "./pages/Blogs.jsx";

const App = () => {
  const {state, setState} = useUserData();
  return (
    <Router>
      {/* <Layout> */}

      <Routes>    
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/dashboard" element={<Sidebar/>}/>
        <Route path="/userDashboard" element={<UserProfile/>} />
        
      </Routes>
      {/* </Layout> */}
    </Router>
  );
};

export default App;
