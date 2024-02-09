import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userCode: 0,
        isAdmin: 0
    },
    reducers: {
        setUserCode: (state, action) => {
            state.userCode = action.payload;
        },
        setUserPrivilege: (state, action) => {
            state.isAdmin = action.payload;
        }
    }
})

export const {setUserCode} = userSlice.actions;
export const {setUserPrivilege} = userSlice.actions;

export default userSlice.reducer;