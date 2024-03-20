import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        name: "invalid",
        email: "invalid@gmail.com",
        handles: [],
        role: 0,
        pic : "",
        uid : "",
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, handles, role ,pic,uid} = action.payload;
            state.user.name = name;
            state.user.email = email;
            state.user.handles = handles;
            state.user.role = role;
            state.user.pic = pic;
            state.user.uid = uid;
        },
        removeUser: (state, action) => {
            state.user.name = "invalid";
            state.user.email = "invalid@gmail.com";
            state.user.handles = [];
            state.user.role = 0;
        }
    }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
  