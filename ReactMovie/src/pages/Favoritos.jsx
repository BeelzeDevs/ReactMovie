import { useFavoritos } from "../context/FavoritosContext";
import MovieCard from "../components/MovieCard";


function Favoritos(){
    const {favoritos} = useFavoritos();
    
    return(
        <div>
            <h2 className="titulo2">Mis peliculas Favoritas</h2>
            {favoritos.length === 0 ? (
                <p>No hay peliculas favoritas</p>
            ) : (
                <div className="grid-cards-favoritos">
                {favoritos.map((peli)=>(
                    <MovieCard key={peli.id} pelicula={peli} />
                ))}
                </div> 
            )}
        </div>
    );
}

export default Favoritos;