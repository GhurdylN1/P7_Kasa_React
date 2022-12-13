// routes
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Lodging from './pages/Lodgings/GetLogementDetails'
import About from './pages/About/About'
import Error404 from './pages/Error404/Error404'
import Profile from './pages/Profile/GetUserProfile'
import SignUp from './forms/SignUp'
import Login from './forms/Login'
import FormLogement from './forms/FormLogement'
import UpdateFormLogement from './forms/UpdateFormLogement'
import DeleteFormLogement from './forms/DeleteFormLogement'
import FormProfile from './forms/FormProfile'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/P7_Kasa_React/signup/" element={<SignUp />} />
        <Route path="/P7_Kasa_React/formlogement" element={<FormLogement />} />
        <Route
          path="/P7_Kasa_React/updateformlogement/:id"
          element={<UpdateFormLogement />}
        />
        <Route
          path="/P7_Kasa_React/deleteformlogement/:id"
          element={<DeleteFormLogement />}
        />
        <Route
          path="/P7_Kasa_React/formprofile/:id"
          element={<FormProfile />}
        />
        <Route path="/P7_Kasa_React/" element={<Login />} />
        <Route path="/P7_Kasa_React/home" element={<Home />} />
        <Route path="/P7_Kasa_React/lodgings/:id" element={<Lodging />} />
        <Route path="/P7_Kasa_React/profile/:id" element={<Profile />} />
        <Route path="/P7_Kasa_React/about" element={<About />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
