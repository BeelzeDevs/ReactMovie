import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buscarGenerosMovie } from "../services/tmoviedb";
import './Navbar.css';

function Navbar() {
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState();
  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    buscarGenerosMovie()
      .then(setGeneros)
      .catch(setError);
  }, []);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      navigate(`/buscar/${busqueda}`);
      setBusqueda("");
      setMenuAbierto(false);
    }
  };

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };
  const cerrarMenuAbierto = () =>{
    setMenuAbierto(false);
  }

  if (error) return <h1>Navbar error: {error}</h1>;

  return (
    <nav className="nav">
      <header className="nav-header">
        <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <Link to="/" className="beelzeimg img-desenfoque" />
      </header>

      <div className={`nav-links ${menuAbierto ? "abierto" : ""}`}>
        <Link to="/" className="beelzeimg2 img-desenfoque" />
        <Link to="/" className="link">
          Inicio
        </Link>
        <Link to="/peliculas" className="link" onClick={cerrarMenuAbierto}>
          Películas
        </Link>
        <Link to="/tv" className="link" onClick={cerrarMenuAbierto}>
          Tv
        </Link>
        <div className="dropdownnav link">
          <span>Géneros</span>
          <ul className="dropdownnav-menu">
            {generos.map((gen) => (
              <li key={gen.id}>
                <Link to={`/genero/${gen.id}`} onClick={cerrarMenuAbierto}>
                  {gen.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/favoritos" className="link" onClick={cerrarMenuAbierto}>
          Favoritos
        </Link>
        <section>
          <form onSubmit={handleSubmit} className="busqueda-container" id="searchForm">
              <span>
                  <input
                      type="search"
                      placeholder="Buscar.."
                      value={busqueda}
                      onChange={handleInputChange}
                      className="barra-busqueda"
                      autoComplete="off"
                      required
                  />
                  <button type="submit" className="busqueda-btn">
                  </button>
              </span>
          </form>
        </section>
      </div>
    </nav>
  );
}

export default Navbar;
