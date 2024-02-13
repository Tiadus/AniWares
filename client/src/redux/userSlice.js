import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userCode: 0,
        isAdmin: 0
    },
    reducers: {
        setUserCode: (state, action) => { //Function to set the userCode to distinguish between customer
            state.userCode = action.payload;
        },
        setUserPrivilege: (state, action) => { //Function to set the privilege of an user to determine if the admin mode should be turned on
            state.isAdmin = action.payload;
        }
    }
})

export const {setUserCode} = userSlice.actions;
export const {setUserPrivilege} = userSlice.actions;

export default userSlice.reducer;