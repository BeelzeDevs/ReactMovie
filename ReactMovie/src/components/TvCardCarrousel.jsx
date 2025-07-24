import {Link} from 'react-router-dom';
import { useState } from 'react';
import NoImagen from '../img/sinimagen.jpg';

function TvCardCarrousel({tvShow}){
    const imagen = tvShow.poster_path !== null ? `https://image.tmdb.org/t/p/w300${tvShow.poster_path}` : `${NoImagen}`;
    
    const [hover, setHover] = useState(false);


    const HoverImg = () =>{
        setHover(true);
    }

    const desactivarHoverImg = () =>{
        setHover(false);
    }

    return(
        <li onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg} className='carrouselCard'>
                <Link to={`/tv/${tvShow.id}`} >
                    <img src={imagen} alt={tvShow.name}  />
                    <h4 className={hover ? 'resaltar' : ''}>{tvShow.name}</h4>
                    <div className="votoCircular">
                        <svg>
                            <circle cx="20" cy="20" r="18"></circle>
                            <circle 
                            cx="20" 
                            cy="20" 
                            r="18" 
                            style={{ strokeDashoffset: 113 - (113 * tvShow.vote_average) / 10 }}
                            ></circle>
                        </svg>
                        <span>{Math.round(tvShow.vote_average * 10)}%</span>
                    </div>
                </Link>
        </li>
    );
}

export default TvCardCarrousel;