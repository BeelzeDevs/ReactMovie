import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalleMovie from './pages/DetalleMovie';
import Favoritos from './pages/Favoritos';
import Navbar from './components/Navbar';
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<DetalleMovie />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </Router>

  )
}

export default App
