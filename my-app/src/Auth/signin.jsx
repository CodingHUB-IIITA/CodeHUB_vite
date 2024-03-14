'use client'
import React from 'react';
import { useFormik } from 'formik';
import { signin } from '../Api/auth.jsx';
import "../App.css";


export default function SigninForm() {
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
        console.log(values);
      signin(values);
    },
    
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-reqLblue">
      <p className="text-white text-2xl font-semibold mb-4 ">Sign In</p>
      <form onSubmit={formik.handleSubmit} className="w-40 sm:w-1/2 bg-reqDblue p-8 rounded-lg">
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange} 
            value={formik.values.email}
            className="w-full bg-white rounded-md p-2"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-white">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange} 
            value={formik.values.password}
            className="w-full bg-white rounded-md p-2"
          />
        </div>
        
        <button type="submit" className="bg-reqLblue text-white px-4 py-2 rounded-md font-semibold">Submit</button>
      </form>
    </div>
  );
}
