import {Link} from 'react-router-dom';
import {useFavoritos} from '../context/FavoritosContext'

function MovieCard({pelicula}){
    const imagen = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`;
    const {favoritos, AgregarFavoritos, QuitarDeFavoritos} = useFavoritos();

    const EsFavorito = favoritos.some((fav)=> fav.id === pelicula.id);

    const toogleFavorito = () =>{
        EsFavorito ? QuitarDeFavoritos(pelicula.id) : AgregarFavoritos(pelicula);
    }

    return(
        <div className='cardMovie'>
            <Link to={`/movie/${pelicula.id}`}>
            <img src={imagen} alt={pelicula.title} className='card-img' /> 
            </Link>
            <h3>{pelicula.title}</h3>
            <p>⭐{pelicula.vote_average}</p>
            <Link to={`/movie/${pelicula.id}`}>Ver Detalles</Link>
            <button onClick={toogleFavorito} className={EsFavorito ? 'cardbtn-quitarFav' : 'cardbtn-agregarFav'}>
                {EsFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
        </div>
    );
}

export default MovieCard;