import { useEffect, useState } from "react";
import {fetchPeliculasPopulares} from '../services/tmoviedb';
import MovieCard from "../components/MovieCard";


function Home(){
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchPeliculasPopulares()
        .then((peliculas) => {
            setPeliculas(peliculas);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if(loading) return <p>Cargando películas...</p>
    if(error) return <p>Error: {error}</p>;
    return(
        <div>
            <h2>Peliculas Populares</h2>
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