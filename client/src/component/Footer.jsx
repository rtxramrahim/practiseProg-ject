import React from 'react'
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
function Footer() {
  return (
    <div className='bg-slate-200 w-screen p-5 shadow-lg '>
        {/* logos */}
      <div className='p-5 flex flex-col gap-4 text-slate-700 font-semibold text-xl'>
        <h1>Connect Us</h1>
        <div className='flex flex-row gap-5 items-center  text-slate-800 '>
            <LuFacebook/>
            <FaSnapchatGhost/>
            <FaInstagram/>
            <FaXTwitter/>

            <FaYoutube/>
            
        </div>
      </div> 

        {/* links */}
       <div className='p-5 flex flex-col gap-2'>
            <h1 className='text-slate-700 font-semibold text-xl  '>Know More</h1>    
            <div className='flex flex-row gap-4 flex-wrap  text-slate-800  text-sm cursor-pointer'>
                <p>About us</p>
                <p>Accessibility</p>
                <p>Feedback</p>
                <p>Media Rooms</p>
                <p>Ad choices</p>
                <p>Advertise with us</p>
                <p>Agent Support</p>
                <p>Privary</p>
                <p>Terms</p>
                <p>Home Made</p>
                <p>Tech Blog</p>
                <p>Sitemap</p>
                <p>Indian Markter.to</p>
            
          
            <p className='text-yellow-600 font-semibold '>Do not Sell or Share my Personal Information</p>
            </div>
       </div>


        {/* products */}
        <div className='flex flex-col gap p-5'>
            <p className='text-slate-700 font-semibold text-xl  '>Products</p>
            <div className='flex flex-row gap-4  flex-wrap text-sm cursor-pointer text-slate-800'>
                <p>Leads & Brandings</p>
                <p>ListHub</p>
                <p>Moving.com</p>
                <p>International Properties</p>
                <p>Avail</p>
                <p>UpNest</p>
                <p>Buider Solutions</p>
            </div>
        </div>

        {/* New corps */}
        <div className='flex flex-col gap p-5'>
            <p className='text-slate-700 font-semibold text-xl  '>News Corps</p>
            <div className='flex flex-row gap-4 text-sm cursor-pointer  flex-wrap text-slate-800'>
            <p>Barrons </p>
            <p>Financial News</p>
            <p>Haper Collins</p>
            <p>Manial Global</p>
            <p>Market Watch</p>
            <p>India Post</p>
            <p>REA Group</p>
            <p>Storyful</p>
            <p>Makaan.com</p>
            <p>Housing.com</p>
            <p>propTiger.com</p>
            <p>NewUk</p>
          
            </div>
        </div>
        <div className='text-xs text-slate-700 p-5   flex flex-col gap-1'>
            <p>*Based on Nov 2023 survey amoung real Estate professionals</p>
            <p>@1995-2023 <span className='semibold underline '>National Association of RealEstate. </span>All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer