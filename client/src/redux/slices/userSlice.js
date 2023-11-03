import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    currentUser : null,
    error : null
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
        signInFailure : (state,action)=>{
            state.error = action.payload
            state.loading = false

        },
        setUser : (state,action)=>{
            state.currentUser = action.payload
        }
    }
})

export const {signInFailure , signInStart ,signInSuccess , setUser} = userSlice.actions
export default userSlice.reducer