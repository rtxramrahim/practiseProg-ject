import React from 'react'
import { useSelector } from 'react-redux'

function Listing() {
  const {listing} = useSelector((state)=>state.listing)  
  return (
    <div></div>
  )
}

export default Listing