import { useEffect, useState } from "react";
import {fetchPeliculasPopulares, buscarPeliculasPorNombre} from '../services/tmoviedb';
import MovieCard from "../components/MovieCard";


function Home(){
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda,setBusqueda] = useState('');
    const [queryFinal,setQueryFinal] = useState('');
  
    useEffect(() => {
        
    setLoading(true);

    const fetchPeliculas = queryFinal.trim() === ''
      ? () => fetchPeliculasPopulares()
      : () => buscarPeliculasPorNombre(queryFinal);

    fetchPeliculas()
      .then((pelis) => {
        setPeliculas(pelis);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [queryFinal]);

    const handleInputChange = e =>{
        setBusqueda(e.target.value);
    }
    const handleSubmit = e =>{
        e.preventDefault();
        setQueryFinal(busqueda);
    }

    if(loading) return <p>Cargando películas...</p>
    if(error) return <p>Error: {error}</p>;
    return(
        <div>
            <h2 className="titulo">Peliculas Populares</h2>
            <form onSubmit={handleSubmit} className="busqueda-container">
                <input 
                type="text"
                placeholder="Buscar peliculas.."
                value={busqueda}
                onChange={handleInputChange}
                className="barra-busqueda"
                />
                <button type="submit" className="busqueda-btn"><span className="busqueda-img"></span></button>
            </form>
            <div className="grid-cards-home">
                {peliculas &&
                    peliculas.map((pelicula)=> (
                       <MovieCard key={pelicula.id} pelicula={pelicula}/>
                        ))
                }
            </div>
        </div>
    );
}

export default Home;