import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "../Context/user";
import { getAuth } from "firebase/auth";
import { useUserData } from "../Context/user";
const UserProfile = () => {
    const  auth  = getAuth();
   
    const {state,setState}=useUserData();
    
console.log(state);
    

    return (
        <div>
            {state ? (
                <div>
                    <div>{state.email}</div>
                    <div>{state.uid}</div> 
                    <div>{state.name}</div>
                </div>
            ) : (
                <span>Sign in</span>
            )}
        </div>
    );
};

export default UserProfile;
