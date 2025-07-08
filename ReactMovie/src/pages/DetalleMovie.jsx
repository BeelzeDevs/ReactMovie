import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarPeliculaPorId,buscarVideos } from "../services/tmoviedb";
import Spinner from "../components/Spinner";

function DetalleMovie() {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);
    const [loadingPelicula, setLoadingPelicula] = useState(true);
    const [errorPelicula, setErrorPelicula] = useState(null);
    const [loadingVideos, setLoadingVideos] = useState(true);
    const [errorVideos, setErrorVideos] = useState(null);
    const [videos,setVideos] = useState([]);

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
        buscarVideos(id)
            .then((vids) => {
            setVideos(vids);
            setLoadingVideos(false);
            })
            .catch((err) => {
            setErrorVideos(err);
            setLoadingVideos(false);
            });
    }, [id]);

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
                <div className="detallemovie-banner">
                    <img src={imagen} alt={pelicula.title} className="img-fondo" />
                    <div >
                        <img src={imagen} alt={pelicula.title} className="detalle-img" />
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
                    <div>
                        <a
                        href={`https://www.imdb.com/title/${pelicula.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Ver en IMDb
                        </a>
                    </div>
                </div>
            </section>
            <section >
                {loadingVideos && <Spinner />}
                {errorVideos && <p>Error cargando videos: {errorVideos.message}</p>}
                <h2 className="section-title">Videos</h2>
                <div className={tamañoVideos > 4 ? "detalle-movie-videosContainer" : "detalle-movie-videosContainerAUX" }>
                    { videosAux && tamañoVideos >= 4 &&
                    videosAux.slice(0, 4).map((vid,index)=>{
                        const youtubeUrl = `https://www.youtube.com/embed/${vid.key}`;
                        return(
                            <div>
                                <iframe src={youtubeUrl} title={vid.name} key={vid.id}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                frameBorder="0"
                                className={index}
                                width="100%"
                                height="100%"
                                ></iframe>
                                <p>{vid.name}</p>
                            </div>
                        );
                    })
                }
                { videosAux && tamañoVideos > 0 &&
                    videosAux.slice(0, 2).map((vid,index)=>{
                        const youtubeUrl = `https://www.youtube.com/embed/${vid.key}`;
                        return(
                            <div>
                                <iframe src={youtubeUrl} title={vid.name} key={vid.id}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                frameBorder="0"
                                className={index}
                                width="100%"
                                height="100%"
                                ></iframe>
                                <p>{vid.name}</p>
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