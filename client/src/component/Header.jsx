import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header>
        <div className='bg-slate-200 shadow-md'>
            <div className='flex flex-row items-center justify-between max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Real</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center '>
                    <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'></input>
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex  gap-4'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'><Link to={"/sign-in"}/>Home</li>
                    <li className='hidden sm:inline text-slate-700 hover:underline'><Link to={"/about"}/>About</li>
                    <li className=' text-slate-700 hover:underline'><Link to={"/sign-up"}/>Sign Up</li>
                </ul>
            </div>

        </div>
    </header>
  )
}

export default Header