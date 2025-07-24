import {Link} from 'react-router-dom';
import { useState } from 'react';
import NoImagen from '../img/sinimagen.jpg';

function MovieCardTendencia({pelicula}){
    const imagen = pelicula.poster_path !== null ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : `${NoImagen}`;
    
    const [hover, setHover] = useState(false);


    const HoverImg = () =>{
        setHover(true);
    }

    const desactivarHoverImg = () =>{
        setHover(false);
    }

    return(
        <li onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg} className='cardTendencia'>
            <div >
                <Link to={`/pelicula/${pelicula.id}`} >
                    <img src={imagen} alt={pelicula.original_title}  />
                    <button className='btnreproductor'></button>
                </Link>
            </div>

            <div className='cardTendencia-info'>
                <Link to={`/pelicula/${pelicula.id}`} >
                    <h4 className={hover ? 'resaltar' : ''}>{pelicula.original_title}</h4>
                    <p>⭐{pelicula.vote_average.toString().slice(0,4)}</p>
                    <span>{pelicula.release_date.slice(0,4)}</span>
                </Link>
            </div>

        </li>
    );
}

export default MovieCardTendencia;