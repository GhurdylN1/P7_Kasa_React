// routes
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Lodging from './pages/Lodgings/Lodgings'
import About from './pages/About/About'
import Error404 from './pages/Error404/Error404'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/P7_Kasa_React/" element={<Home />} />
        <Route path="/P7_Kasa_React/lodgings/:id" element={<Lodging />} />
        <Route path="/P7_Kasa_React/about" element={<About />} />
        <Route path="/P7_Kasa_React/*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
