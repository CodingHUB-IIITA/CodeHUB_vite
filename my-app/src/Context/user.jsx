import React, { createContext, useContext, useState } from 'react';
//createContext():- function used to create a context object
//This object allows to share state or functions across multiple react components without having to pass props manually at every level of the component tree
const UserContext = createContext();
const UserDataProvider = ({ children }) => {
    const [user,setUser]=useState({
        name: "",
        email: "",
        handle: [],
        role: 0,
    });
    const [state, setState] = useState(user);
    

    return (
        <UserContext.Provider value={{ state,setState }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext)

export default UserDataProvider;
 


//prop:- a way to pass data from a parent component to a child component
//userDataProvider :- functional component ;
//It has state variable , userData (initially set to null)
//It return a UserContext.Provider component that allows sharing data with consuming components

//Its prop is set to an object {userData,setUserData} represents the context value that will be provided to consuming components
//children rendered inside the component signifies that any component nested within userDataProvider can access the context value 

//UserDataProvider is a context provider component responsible for managing the user data state (userData) and making it accessible
// to all its nested child components through the context API. It encapsulates the context creation and state management logic, allowing 
//consuming components to access and update the user data state as needed.

//UserContext:- context object created using createContext() and contains the state data related to the user
//useUserData()=>custom hook which returns the current user data stored in the userContext and allows components to access and use the user data without having to pass it down through props from parent components
