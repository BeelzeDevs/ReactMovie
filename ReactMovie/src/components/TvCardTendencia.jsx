import {Link} from 'react-router-dom';
import { useState } from 'react';
import NoImagen from '../img/sinimagen.jpg';

function TvCardTendencia({tvShow}){
    const imagen = tvShow.poster_path !== null ? `https://image.tmdb.org/t/p/w300${tvShow.poster_path}` : `${NoImagen}`;
    
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
                <Link to={`/pelicula/${tvShow.id}`} >
                    <img src={imagen} alt={tvShow.name}  />
                    <button className='btnreproductor'></button>
                </Link>
            </div>

            <div className='cardTendencia-info'>
                <Link to={`/pelicula/${tvShow.id}`} >
                    <h4 className={hover ? 'resaltar' : ''}>{tvShow.name}</h4>
                    <p>⭐{tvShow.vote_average.toString().slice(0,4)}</p>
                    <span>{tvShow.first_air_date.slice(0,4)}</span>
                </Link>
            </div>

        </li>
    );
}

export default TvCardTendencia;