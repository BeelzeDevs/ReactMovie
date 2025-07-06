import { useFavoritos } from "../context/FavoritosContext";
import MovieCard from "../components/MovieCard";


function Favoritos(){
    const {favoritosPeli} = useFavoritos();
    
    return(
        <div>
            <h2 className="titulo2">Mis peliculas Favoritas</h2>
            {favoritosPeli.length === 0 ? (
                <p>No hay peliculas favoritas</p>
            ) : (
                <div className="grid-cards-favoritos">
                {favoritosPeli.map((peli)=>(
                    <MovieCard key={peli.id} pelicula={peli} />
                ))}
                </div> 
            )}
        </div>
    );
}

export default Favoritos;