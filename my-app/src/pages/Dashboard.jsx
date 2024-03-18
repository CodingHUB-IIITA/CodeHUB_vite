import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { getUserProfile, signin } from "../Api/auth";
import { getAuth } from "firebase/auth";
import { useUserData } from "../Context/user";

const Dashboard=()=>{
   const {state,setState}=useUserData();
return(
    <div>
        <Sidebar/>
       {state.name}
       {state.email}
    </div>
)
}
export default Dashboard;
