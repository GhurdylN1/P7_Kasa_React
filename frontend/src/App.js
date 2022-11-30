// routes
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Lodging from './pages/Lodgings/GetLogementDetails' // test axios
// import Lodging from './pages/Lodgings/Lodgings'
import About from './pages/About/About'
import Error404 from './pages/Error404/Error404'
import Profile from './pages/Profile/GetUserProfile' // test axios
// import Profile from './pages/Profile/Profile'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import FormLogement from './pages/FormLogement'
import FormProfile from './pages/Profile/FormProfile'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/P7_Kasa_React/signup/" element={<SignUp />} />
        <Route path="/P7_Kasa_React/formlogement" element={<FormLogement />} />
        <Route path="/P7_Kasa_React/formprofile" element={<FormProfile />} />
        <Route path="/P7_Kasa_React/" element={<Login />} />
        <Route path="/P7_Kasa_React/home" element={<Home />} />
        <Route path="/P7_Kasa_React/lodgings/:id" element={<Lodging />} />
        <Route path="/P7_Kasa_React/profile/:id" element={<Profile />} />{' '}
        {/* test axios*/}
        {/* <Route path="/P7_Kasa_React/profile/:name" element={<Profile />} /> */}
        <Route path="/P7_Kasa_React/about" element={<About />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
