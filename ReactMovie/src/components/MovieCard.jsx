import {Link, useSearchParams} from 'react-router-dom';
import {useFavoritos} from '../context/FavoritosContext';
import { useEffect, useState } from 'react';
import {buscarGenerosMovie} from '../services/tmoviedb';

function MovieCard({pelicula}){
    const imagen = `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`;
    const {favoritosPeli, AgregarPeliculaFavoritos, QuitarPeliculaDeFavoritos} = useFavoritos();
    
    const [hover, setHover] = useState(false);
    const [generos,setGeneros]= useState([]);
    const [error, setError] = useState('');

    const EsFavoritoPeli = favoritosPeli.some((fav)=> fav.id === pelicula.id);

    useEffect(()=>{
        buscarGenerosMovie()
        .then((gen)=>{
            setGeneros(gen);
        })
        .catch((err)=>{
            setError(err.message);
        });
    },[pelicula])
    
    const toogleFavorito = () =>{
        EsFavoritoPeli ? QuitarPeliculaDeFavoritos(pelicula) : AgregarPeliculaFavoritos(pelicula);
    }

    const HoverImg = () =>{
        setHover(true);
    }

    const desactivarHoverImg = () =>{
        setHover(false);
    }

    if(error) return <h2>Error {error}</h2>
    return(
        <li className='cardMovie' onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg}>
            <Link to={`/movie/${pelicula.id}`} >
                <img src={imagen} alt={pelicula.original_title} className="card-img" />
                <button className='btnreproductor'></button>
            </Link>
            {hover &&
                <div className="card-overviewInfor" >
                    <header className="title">
                        <h4>{pelicula.original_title}</h4>
                    </header>
                    <section className="info">
                        <p>⭐{pelicula.vote_average.toString().slice(0,4)}</p>
                        <span>{pelicula.release_date.slice(0,4)}</span>
                    </section>
                    <section className="description">
                        <p >{pelicula.overview.slice(0,120)}</p>
                        <div className="generos">
                            <span >Género: </span>
                            <span>
                                {pelicula.genre_ids.map(element=> {

                                    const generoEncontrado = generos.find((g) => g.id === element);
                                    return generoEncontrado ? generoEncontrado.name : null;
                                    
                                })
                                .filter((nombre) => nombre !== null)
                                .join(', ')}
                            </span>
                        </div>
                    </section>
                </div>
            }
            <button onClick={toogleFavorito} className={EsFavoritoPeli ? 'btnAgregarFav' : 'btnQuitarFav'}>
                
            </button>
        </li>
    );
}

export default MovieCard;