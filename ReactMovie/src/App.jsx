import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalleMovie from './pages/DetalleMovie';
import Favoritos from './pages/Favoritos';
import Navbar from './components/Navbar';
import Tv from './pages/Tv';
import DetalleTv from './pages/DetalleTv';
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<DetalleMovie />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<DetalleTv />} />
      </Routes>
    </Router>

  )
}

export default App
