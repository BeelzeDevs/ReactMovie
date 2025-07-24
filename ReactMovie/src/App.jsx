import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalleMovie from './pages/DetalleMovie';
import Favoritos from './pages/Favoritos';
import Navbar from './components/Navbar';
import Tv from './pages/Tv';
import DetalleTv from './pages/DetalleTv';
import Genero from './pages/Genero';
import Peliculas from './pages/Peliculas';
import BuscarTvOMovie from './pages/BuscarTvOMovie';
import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/pelicula/:id" element={<DetalleMovie />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<DetalleTv />} />
        <Route path='/genero/:id' element={<Genero />} />
        <Route path='/buscar/:busqueda' element={<BuscarTvOMovie />} />
      </Routes>
    </Router>

  )
}

export default App
