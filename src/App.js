// routes
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Lodging from './pages/Lodging'
import About from './pages/About'
import Error404 from './pages/Error404'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lodging" element={<Lodging />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
