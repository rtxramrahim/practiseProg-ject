import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    currentUser : null,
    error : null ,
    token : null
}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state)=>{
            state.loading = true
        },
        signInSuccess : (state,action)=>{
            state.currentUser = action.payload
            state.loading = false
            state.error = null 
        },
        setToken : (state,action)=>{
            state.token = action.payload
        },
        signInFailure : (state,action)=>{
            state.error = action.payload
            state.loading = false

        },
        setUser : (state,action)=>{
            state.currentUser = action.payload
        },
        updateUserStart : (state)=>{
            state.loading = true
        },
        updateUserSuccess : (state,action)=>{
            state.currentUser = action.payload
            state.loading = false,
            state.error = null
        },
        updateUserFailure : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        signOut : (state)=>{
            state.currentUser = null,
            state.token = null
        }
    }
})

export const {signInFailure , signInStart ,signInSuccess , setUser , updateUserFailure , updateUserSuccess , updateUserStart , setToken , signOut} = userSlice.actions
export default userSlice.reducer