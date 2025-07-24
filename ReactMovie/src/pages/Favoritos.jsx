import { useFavoritos } from "../context/FavoritosContext";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";


function Favoritos(){
    const {favoritosPeli,favoritosTv} = useFavoritos();
    
    return(
        <section className="main3">
            {favoritosPeli.length > 0 &&
            <article>
                <h2 className="titulo2">Mis peliculas Favoritas</h2>
                <ul className="grid-cards">
                {favoritosPeli.map((peli)=>(
                    <MovieCard key={peli.id} pelicula={peli} />
                ))}
                </ul> 
            </article>
            }
              
            {favoritosTv.length > 0 && 
            <article className="main3Videos">
                <h2 className="titulo2">Mis Tv Favoritas</h2>
                <ul className="grid-cards">
                    {favoritosTv.map((tv)=>(
                        <TvCard tvShow={tv} key={tv.id}/>
                    ))}
                </ul>
            </article>
            }
        </section>

    );
}

export default Favoritos;