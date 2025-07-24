import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPeliculaPorId,buscarVideosMovie } from "../services/tmoviedb";
import Spinner from "../components/Spinner";
import './DetalleMovie.css';
import {useFavoritos} from '../context/FavoritosContext';

function DetalleMovie() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [loadingPelicula, setLoadingPelicula] = useState(true);
    const [errorPelicula, setErrorPelicula] = useState(null);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [errorVideos, setErrorVideos] = useState(null);
    const [videos,setVideos] = useState([]);

    const {favoritosPeli, AgregarPeliculaFavoritos, QuitarPeliculaDeFavoritos} = useFavoritos();
    const esFavorito = favoritosPeli.some((fav)=> fav.id === Number(id));

    useEffect(() => {
        setLoadingPelicula(true);
        buscarPeliculaPorId(id)
        .then((data) => {
            setPelicula(data);
            setLoadingPelicula(false);
        })
        .catch((err) => {
            setErrorPelicula(err);
            setLoadingPelicula(false);
        });
    }, [id]);

    useEffect(() => {
        setLoadingVideos(true);
        buscarVideosMovie(id)
            .then((vids) => {
            setVideos(vids);
            setLoadingVideos(false);
            })
            .catch((err) => {
            setErrorVideos(err);
            setLoadingVideos(false);
            });
    }, [id]);
    
    const handleFavoritoClick = () =>{
        esFavorito ? QuitarPeliculaDeFavoritos(pelicula): AgregarPeliculaFavoritos(pelicula);
    }

    if (loadingPelicula) return <Spinner />;
    if (errorPelicula) return <p>Error: {errorPelicula.message}</p>;

    const imagen = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
    const generos = pelicula.genres.map((g) => g.name);
    const generosIds = pelicula.genres.map((g)=> g.id);

    const videosAux = videos.filter((v)=> v.type === 'Trailer' || v.type === 'Clip' && v.site === 'Youtube');
    const tamañoVideos = videosAux.length; 
        
    return (
        <div >
            <section className="detallemovie-container">
                <div className="banner">
                    <img src={imagen} alt={pelicula.title} className="img-fondo" />
                    <div >
                        <img src={imagen} alt={pelicula.title} className="detalle-img" />
                        <div className="detalle-btns">
                            <button className={esFavorito ? "btnQuitarFavMovie" : "btnAgregarFavMovie"} onClick={handleFavoritoClick}>{esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}</button>
                            <a
                            href={`https://www.imdb.com/title/${pelicula.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkImbd"
                            >
                            Ver en IMDb
                            </a>
                        </div>
                    </div>
                    <div className="detalle-info">
                        <h2><strong>{pelicula.title}</strong></h2>
                        <p>⭐{pelicula.vote_average}</p>
                        <p>{pelicula.release_date?.slice(0, 4)}</p>
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
                        <p>Descripción: {pelicula.overview}</p>
                    </div>
                    
                </div>
            </section>
            <section >
                {loadingVideos && <Spinner />}
                {errorVideos && <p>Error cargando videos: {errorVideos.message}</p>}
                <div className={tamañoVideos > 3 ? "detalle-movie-videosContainer" : "detalle-movie-videosContainer"}>
                {
                    videosAux && tamañoVideos > 0 &&
                    videosAux.slice(0, tamañoVideos > 3 ? 4 : 3).map((vid, index) => {
                        const youtubeUrl = `https://www.youtube.com/embed/${vid.key}`;
                        return (
                            <div key={vid.id} className="video-wrapper">
                                <div className="responsive-iframe">
                                    <iframe
                                        src={youtubeUrl}
                                        title={vid.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <p>{vid.name}</p>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </section>
        </div>
    );
}

export default DetalleMovie;