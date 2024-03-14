import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninForm from "./Auth/signin";
import SignupForm from "./Auth/signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </Router>
  );
};

export default App;
