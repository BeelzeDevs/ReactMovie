import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {buscarGenerosTv} from '../services/tmoviedb';
import NoImagen from '../img/sinimagen.jpg';
import {useFavoritos} from '../context/FavoritosContext';

function TvCard({tvShow}){
    
    const imagen = tvShow.poster_path !== null ? `https://image.tmdb.org/t/p/w300${tvShow.poster_path}` : `${NoImagen}`;
    const [hover, setHover] = useState(false);
    const [generos,setGeneros]= useState([]);
    const [error,setError] = useState(null);
    const {favoritosTv,AgregarTvFavoritos,QuitarTvDeFavoritos} = useFavoritos();
    

    const EsFavoritoTv = favoritosTv.some((fav)=> fav.id === tvShow.id);

    const HoverImg = () =>{
        setHover(true);
    }
    const desactivarHoverImg = () =>{
        setHover(false);
    }
     
    const toogleFavorito = () =>{
        EsFavoritoTv ? QuitarTvDeFavoritos(tvShow) : AgregarTvFavoritos(tvShow);
    }
    useEffect(()=>{
        buscarGenerosTv()
        .then((gen)=>{
            setGeneros(gen);
        })
        .catch((err)=>{
            setError(err.message);
        });
    },[])


    if(error) return <p>Error: {error}</p>

    return(
        <li className="cardTv" onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg}>
            <Link to={`/tv/${tvShow.id}`} >
                <img src={imagen} alt={tvShow.name} className="card-img" />
                <button className='btnreproductor'></button>
            </Link>
            
            {hover &&
                <div className="card-overviewInfor" >
                    <header className="title">
                        <h4>{tvShow.name}</h4>
                    </header>
                    <section className="info">
                        <p>⭐{tvShow.vote_average.toString().slice(0,4)}</p>
                        <span>{tvShow.first_air_date.slice(0,4)}</span>
                    </section>
                    <section className="description">
                        <p >{tvShow.overview.slice(0,120)}</p>
                        <div className="generos">
                            <span >Género: </span>
                            <span>
                                {tvShow.genre_ids?.map(element=> {
                                    const generoEncontrado = generos.find((g)=> g.id === element)
                                    return generoEncontrado ? generoEncontrado.name : null;
                                })
                                .filter((nombreGen)=> nombreGen !== null)
                                .join(', ')
                            }
                            </span>
                        </div>
                    </section>
                </div>
            }
            <button onClick={toogleFavorito} className={EsFavoritoTv ? 'btnAgregarFav' : 'btnQuitarFav'}>
                
            </button>
        </li>
    );
}

export default TvCard;