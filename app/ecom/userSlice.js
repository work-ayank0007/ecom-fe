import { createSlice } from "@reduxjs/toolkit"


const initialState={
    loggedIn:false,
    role:"guest"
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logged:(state,action)=>{
            state.loggedIn=action.payload;
        },
        setRole:(state,action)=>{
            state.role=action.payload
        }
    }
})
export const{logged,setRole}=userSlice.actions;
export default userSlice.reducer