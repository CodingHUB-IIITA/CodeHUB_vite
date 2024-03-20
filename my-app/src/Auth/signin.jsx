
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { signin } from '../Api/auth.jsx';
import "../styles/global.css"
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../Context/user.jsx';

export default function SigninForm() {
  const {state,setState}=useUserData();
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      
    },
    onSubmit: async(values) => {
        try{
          await signin(values).then((querySnapshot) =>{
            querySnapshot.forEach(element => {
              const {name,role,email,handles,pic} = element.data();
              setState((prevState) => ({...prevState, 
                name: name,
                role: role,
                email: email,
                handles: handles,
                pic: pic 
              }))
              navigate('/');
            });
          });
        }
        catch(err){
           console.error(err);
        }
    },

  });
//   useEffect(()=>{
//     if(userData!=null){
// navigate('/');
//     }

//   },[userData,navigate]);

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
