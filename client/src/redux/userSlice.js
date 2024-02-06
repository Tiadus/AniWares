import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userCode: 2
    },
    reducers: {
        setUserCode: (state, action) => {
            state.userCode = action.payload;
        }   
    }
})

export const {setUserCode} = userSlice.actions;

export default userSlice.reducer;