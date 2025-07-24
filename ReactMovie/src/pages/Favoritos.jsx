import { useFavoritos } from "../context/FavoritosContext";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";


function Favoritos(){
    const {favoritosPeli = [],favoritosTv = []} = useFavoritos();
    
    return(
        <section className="main3">
            {favoritosPeli?.length > 0 &&
            <article>
                <h2 className="titulo2">Mis peliculas Favoritas</h2>
                <ul className="grid-cards">
                {favoritosPeli.length > 0 ? favoritosPeli.map((peli)=>(
                    <MovieCard key={peli.id} pelicula={peli} />
                )): <p>❌No hay peliculas favoritas❌</p>}
                </ul> 
            </article>
            }
              
            {favoritosTv?.length > 0 && 
            <article className="main3Videos">
                <h2 className="titulo2">Mis Tv Favoritas</h2>
                <ul className="grid-cards">
                    {favoritosTv.length > 0 ? favoritosTv.map((tv)=>(
                        <TvCard tvShow={tv} key={tv.id}/>
                    )):<p>❌No hay favoritos Tv❌</p>}
                </ul>
            </article>
            }
        </section>

    );
}

export default Favoritos;