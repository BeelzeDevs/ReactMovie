import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import {buscarTvShowPorId,buscarTvShowRecommendations,buscarTvSeasonEpisodes} from '../services/tmoviedb';
import Spinner from "../components/Spinner";
import NoImagen from '../img/sinimagen.jpg';
import {useFavoritos} from '../context/FavoritosContext';
import './DetalleTv.css';

function DetalleTv (){
    const {id} = useParams();

    const [tvShow, setTvShow] = useState(null);
    const [loadingTvShow, setLoadingTvShow] = useState(true);
    const [errorTvShow, setErrorTvShow] = useState(null);

    const [seasonEpisodes, setSeasonEpisodes] = useState([]);
    const [errorSeason,setErrorSeason] = useState(null);
    const [loadingSeasonEpisodes, setLoadingSeasonEpisodes] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);

    
    const [recommendations, setRecommendations] = useState([]);
    const [errorRecommendations, setErrorRecommendations] = useState(null);
    const [loadingRecommendations,setLoadingRecommendations] = useState(true);
    
    const {favoritosTv, AgregarTvFavoritos, QuitarTvDeFavoritos} = useFavoritos();
    const esFavorito = favoritosTv.some((fav)=> fav.id === Number(id));

    useEffect(() => {
        setLoadingTvShow(true);
        setSelectedSeason(1)

        buscarTvShowPorId(id)
        .then((data) => {
            setTvShow(data);
            setLoadingTvShow(false);
        })
        .catch((err) => {
            setErrorTvShow(err);
            setLoadingTvShow(false);
        });
    }, [id]);

    useEffect(()=>{
        setLoadingRecommendations(true);
        
        buscarTvShowRecommendations(id)
        .then((recom)=>{
            setRecommendations(recom)
            setLoadingRecommendations(false);
        })
        .catch((err)=>{
            setErrorRecommendations(err);
            setLoadingRecommendations(false);
        })

    },[id])

    
    useEffect(()=>{
        setLoadingSeasonEpisodes(true);

        buscarTvSeasonEpisodes(id,selectedSeason)
        .then((episodes)=>{
            setSeasonEpisodes(episodes)
            setLoadingSeasonEpisodes(false);
        })
        .catch((err)=>{
            setErrorSeason(err);
            setLoadingSeasonEpisodes(false);
        })

    },[id,selectedSeason])

    const handleSelectedSeasonChange = (e)=>{
        setSelectedSeason(e.target.value);
    }

    if (loadingTvShow) return <Spinner />;
    if (errorTvShow) return <p>Error: {errorTvShow.message}</p>;

    const imagenPrincipalUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
    const generos = tvShow.genres.map((g) => g.name);
    const generosIds = tvShow.genres.map((g)=> g.id);

    
    const cantidadSeasons = tvShow.number_of_seasons;

    const handleFavoritoClick = () =>{
        esFavorito ? QuitarTvDeFavoritos(tvShow): AgregarTvFavoritos(tvShow);
    }


    return (
        <div >
            {/* Banner de img e info del Tv Show */}
            <section className="TvShowContainer1">
                <div className="banner">
                    <img src={imagenPrincipalUrl} alt={tvShow.name} className="img-fondo" />
                    <div >
                        <img src={imagenPrincipalUrl} alt={tvShow.name} className="detalle-img" />
                        <div className="detalle-btns">
                        <button className={esFavorito ? "btnQuitarFavTv" : "btnAgregarFavTv"} onClick={handleFavoritoClick}>{esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}</button>
                        <a
                        href={`${tvShow.homepage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkTvHomePage"
                        >
                        Ver en Homepage
                        </a>
                    </div>
                    </div>
                    <div className="detalle-info">
                        <h2><strong>{tvShow.name}</strong></h2>
                        <h3><strong>{tvShow.original_name}</strong></h3>
                        <p>⭐{tvShow.vote_average.toString().slice(0,3)}</p>
                        <p>{tvShow.first_air_date?.slice(0, 4)}</p>
                        <p>Géneros: {generosIds.map((elemento,index)=>{
                            
                            const generoNombre = generos[index];
                            const key = `genero-${elemento}`;

                            if(index === generosIds.length -1)return(
                                <Link to={`/genero/${elemento}`} className="generolink" key={key}>{generoNombre}</Link>
                            )
                            return(
                                <Link to={`/genero/${elemento}`} className="generolink" key={key}>{generoNombre}, </Link>
                                )
                        })
                        }
                        </p>
                        <p>Descripción: {tvShow.overview}</p>
                    </div>
                    
                </div>
            </section>
            {/* Seleccionar temporadas, episodios de temporadas, recomendadas */}
            <section className="TvShowContainer2">
                <header>
                    <span className="spanselect">Seleccionar temporada</span>    
                    <select className="dropdown"
                        value={selectedSeason}
                        onChange={handleSelectedSeasonChange}
                        id="seasonSelect"
                        name="season"
                    >
                        {
                            Array.from({length:cantidadSeasons}, (_,i) =>(
                                <option key={i + 1} value={i + 1}>Temporada {i + 1}</option>
                            ))
                        }
                    </select>
                </header>
                
                <article className="TvSeasonContainer">
                    {loadingSeasonEpisodes && <Spinner />}
                    {errorSeason && <p>Error cargando episodios : {errorSeason.message}</p>}
                    {seasonEpisodes &&
                    <ul>
                        {seasonEpisodes.map((item,index)=>{
                            
                            const imagenUrl = item.still_path !== null ? `https://image.tmdb.org/t/p/w500${item.still_path}` : `${NoImagen}`;
                            return(
                                <li key={item.id} >
                                    <img src={imagenUrl} alt={item.name}></img>
                                    <h4>{item.name}</h4>
                                    <span>{`${selectedSeason}x${index+1}`}</span>
                                    <button></button>
                                </li>)
                        })}
                    </ul>
                    }
                        
                            
                       
                </article>
                <article className="TvRecommendationContainer">
                    {loadingRecommendations && <Spinner />}
                    {errorRecommendations && <p>Error cargando recomendaciones : {errorRecommendations.message}</p>}
                    {recommendations.length > 0 &&
                    <ul>
                        <h3 className="recomendados-titulo"><strong>Recomendados</strong></h3>
                        {recommendations.slice(0,5).map((rec)=>{
                            const imgUrl = `https://image.tmdb.org/t/p/w500${rec.poster_path}`;
                            return(
                            <li key={rec.id}>
                                <Link to={`/tv/${rec.id}`}>
                                <img src={imgUrl} alt={rec.name} />
                                <h4>{rec.name}</h4>
                                </Link>
                            </li>   
                            );

                        })}
                    </ul>
                    }
                </article>     
            </section>
        </div>
    );
}

export default DetalleTv;