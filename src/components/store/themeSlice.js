import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeStatus: false,
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme(state,action){
            state.themeStatus = !state.themeStatus;
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;