// routes
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home/Home'
import Lodging from '../pages/Lodgings/GetLogementDetails'
import About from '../pages/About/About'
import Error404 from '../pages/Error404/Error404'
import Profile from '../pages/Profile/GetUserProfile'
import SignUp from '../forms/SignUp'
import Login from '../forms/Login'
import FormLogement from '../forms/FormLogement'
import UpdateFormLogement from '../forms/UpdateFormLogement'
import DeleteFormLogement from '../forms/DeleteFormLogement'
import FormProfile from '../forms/FormProfile'

const configRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/lodgings/:id" element={<Lodging />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/formprofile/:id" element={<FormProfile />} />
      <Route path="/formlogement" element={<FormLogement />} />
      <Route path="/updateformlogement/:id" element={<UpdateFormLogement />} />
      <Route path="/deleteformlogement/:id" element={<DeleteFormLogement />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  )
}

export default configRoutes
