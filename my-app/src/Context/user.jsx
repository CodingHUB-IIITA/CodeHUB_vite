import React, { createContext, useContext, useState } from 'react';

const User = {
    name: "invalid",
    email: "",
    picture: "",
    // token: "",
    // role: 0,
    // handles: []
}

const userContext = createContext();

const UserDataProvider = ({ children }) => {
    const [state, setState] = useState(User);

    return (
        <userContext.Provider value={{ state, setState }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(userContext);
}

export default UserDataProvider;
 