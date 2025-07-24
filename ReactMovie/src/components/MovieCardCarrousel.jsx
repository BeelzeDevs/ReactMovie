import {Link} from 'react-router-dom';
import { useState } from 'react';
import NoImagen from '../img/sinimagen.jpg';

function MovieCardCarrousel({pelicula}){
    const imagen = pelicula.poster_path !== null ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : `${NoImagen}`;
    
    const [hover, setHover] = useState(false);


    const HoverImg = () =>{
        setHover(true);
    }

    const desactivarHoverImg = () =>{
        setHover(false);
    }

    return(
        <li onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg} className='carrouselCard'>
                <Link to={`/pelicula/${pelicula.id}`} >
                    <img src={imagen} alt={pelicula.original_title}  />
                    <h4 className={hover ? 'resaltar' : ''}>{pelicula.original_title}</h4>
                    <div className="votoCircular">
                        <svg>
                            <circle cx="20" cy="20" r="18"></circle>
                            <circle 
                            cx="20" 
                            cy="20" 
                            r="18" 
                            style={{ strokeDashoffset: 113 - (113 * pelicula.vote_average) / 10 }}
                            ></circle>
                        </svg>
                        <span>{Math.round(pelicula.vote_average * 10)}%</span>
                    </div>
                </Link>
        </li>
    );
}

export default MovieCardCarrousel;