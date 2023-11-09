import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listing : null
}
const listingSlice = createSlice({
    name : 'listing',   
    initialState,
    reducers : {
        setNewListing : (state,action)=>{
            state.listing = action.payload
        }
    }
})
export const {setNewListing} = listingSlice.actions
export default listingSlice.reducer