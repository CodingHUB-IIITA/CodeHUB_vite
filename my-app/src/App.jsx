import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/signin";
import SignupForm from "./Auth/signup";
import Dashboard from "./pages/Dashboard";
import { useUserData } from "./Context/user.jsx";
import "./App.css"
import UserProfile from "./pages/UserProfile.jsx";
import Layout from "./Components/Layout.jsx";
import BlogsList from "./pages/Blogs.jsx";

const App = () => {
  const {state, setState} = useUserData();
  console.log(state);
  return (
    <Router>
      {/* <Layout> */}

      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/userDashboard" element={<UserProfile/>} />
        <Route path="/blogs" element={<BlogsList/>} />
      </Routes>
      {/* </Layout> */}
    </Router>
  );
};

export default App;
