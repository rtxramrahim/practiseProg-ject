import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Header from './component/Header'
import {Toaster} from 'react-hot-toast'
import PrivateRoute from './PrivateRoute'
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
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </BrowserRouter>
    
  )
}

export default App
