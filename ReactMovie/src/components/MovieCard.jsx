import {Link} from 'react-router-dom';
import {useFavoritos} from '../context/FavoritosContext';

function MovieCard({pelicula}){
    const imagen = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`;
    const {favoritosPeli, AgregarPeliculaFavoritos, QuitarPeliculaDeFavoritos} = useFavoritos();

    const EsFavoritoPeli = favoritosPeli.some((fav)=> fav.id === pelicula.id);

    const toogleFavorito = () =>{
        EsFavoritoPeli ? QuitarPeliculaDeFavoritos(pelicula) : AgregarPeliculaFavoritos(pelicula);
    }

    return(
        <div className='cardMovie'>
            <Link to={`/movie/${pelicula.id}`}>
            <img src={imagen} alt={pelicula.title} className='card-img' /> 
            </Link>
            <h3>{pelicula.title}</h3>
            <p>⭐{pelicula.vote_average}</p>
            <Link to={`/movie/${pelicula.id}`}>Ver Detalles</Link>
            <button onClick={toogleFavorito} className={EsFavoritoPeli ? 'cardbtn-quitarFav' : 'cardbtn-agregarFav'}>
                {EsFavoritoPeli ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
        </div>
    );
}

export default MovieCard;