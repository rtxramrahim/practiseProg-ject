import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setUser , signOut} from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
// import { signOut } from 'firebase/auth'
function Header() {
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    console.log(currentUser)
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
                <ul className='flex  gap-4 cursor-pointer'>
                    <Link to={"/"}><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
                    <Link to={"/about"}><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
                    {
                        currentUser ? <Link to={"/profile"}> <img className='rounded-full object-cover h-7 w-7' src={currentUser.avatar} alt='profile'/> </Link> : <Link to={"/sign-up"}><li className='text-slate-700 hover:underline'>Sign Up</li></Link>
                    }
                    <button onClick={()=>{
                        dispatch(signOut())
                    }}> log out</button>
                </ul>

            </div>

        </div>
    </header>
  )
}

export default Header