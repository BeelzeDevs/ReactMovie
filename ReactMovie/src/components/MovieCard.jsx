import {Link} from 'react-router-dom';

function MovieCard({pelicula}){
    const imagen = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`;

    return(
        <div className='cardMovie'>
            <Link to={`/movie/${pelicula.id}`}>
            <img src={imagen} alt={pelicula.title} className='card-img' /> 
            </Link>
            <h3>{pelicula.title}</h3>
            <p>⭐{pelicula.vote_average}</p>
            <Link to={`/movie/${pelicula.id}`}>Ver Detalles</Link>
        </div>
    );
}

export default MovieCard;