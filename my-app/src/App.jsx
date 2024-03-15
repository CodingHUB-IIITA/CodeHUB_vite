import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/signin";
import SignupForm from "./Auth/signup";
import Dashboard from "./pages/Dashboard";
import UserDataProvider from "./Context/user.jsx";
import { useUserData } from "./Context/user.jsx";
const App = () => {
  const {state, setState} = useUserData();
  console.log(state);
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
