import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Header from './component/Header'
import {Toaster} from 'react-hot-toast'
import CreateListing from './pages/CreateListing'
import PrivateRoute from './PrivateRoute'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import YourListings from './pages/YourListings'
// import rootReducer from './reducers'
// import { configureStore } from '@reduxjs/toolkit'
// import { Provider } from 'react'
function App() {
  // const store = configureStore({
  //   reducer : rootReducer
  // })
  return(
      
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/listing/:listingId' element={<Listing/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/listing/create' element={<CreateListing/>}></Route>
          <Route path='listing/uploaded/:id' element={<YourListings/>}></Route>
          <Route path = 'listing/update-listing/:listingId' element={<UpdateListing/>}></Route>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
    
  )
}

export default App
