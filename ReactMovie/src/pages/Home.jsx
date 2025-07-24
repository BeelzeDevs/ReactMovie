import { useEffect, useState, useRef } from "react";
import { fetchPeliculasMejorValoradas, fetchTvMejorValoradas } from "../services/tmoviedb";
import MovieCardCarrousel from "../components/MovieCardCarrousel";
import TvCardCarrousel from "../components/TvCardCarrousel";
import Spinner from "../components/Spinner";
import "./Home.css";

function Home(){
    const [peliculas, setPeliculas] = useState([]);
    const [loadingPeli, setLoadingPeli] = useState(true);
    const [errorPeli, setErrorPeli] = useState(null);
    const carruselRef1 = useRef(null);

    
    const [tvShows, setTvShows] = useState([]);
    const [loadingTv, setLoadingTv] = useState(true);
    const [errorTv,setErrorTv] = useState(null);
    const carruselRef2 = useRef(null);

    useEffect(() => {
        fetchPeliculasMejorValoradas()
            .then((data) => {
                setPeliculas(data.slice(0, 20));
                setLoadingPeli(false);
            })
            .catch((err) => {
                setErrorPeli(err);
                setLoadingPeli(false);
            })
    }, []);

    useEffect(()=>{
        fetchTvMejorValoradas()
            .then((data) => {
                setTvShows(data.slice(0, 20));
                setLoadingTv(false);
            })
            .catch((err) =>{
                setErrorTv(err);
                setLoadingTv(false);

            }) 
        },[]);

    const scroll = (ref, direccion) => {
        const scrollCantidad = 267.45;
        if (!ref.current) return;

        const contenedor = ref.current;
        const maxScroll = contenedor.scrollWidth - contenedor.clientWidth;

        if (direccion === 'left') {
            contenedor.scrollLeft <= 0
                ? (contenedor.scrollLeft = maxScroll)
                : contenedor.scrollBy({ left: -scrollCantidad, behavior: 'smooth' });
        } else {
            contenedor.scrollLeft >= maxScroll - 5
                ? (contenedor.scrollLeft = 0)
                : contenedor.scrollBy({ left: scrollCantidad, behavior: 'smooth' });
        }
    };


    return(
    <section>
        <article>
            <h2 className="titulo2">Películas Mejor valoradas</h2>
            {loadingPeli && <Spinner />}
            {errorPeli && <p>Error : {errorTv.message}</p>}
            {!loadingPeli && (
                <div className="carousel-container">
                    <button onClick={() => scroll(carruselRef1,'left')} className="carousel-btn left">
                       
                    </button>

                    <div className="carousel" ref={carruselRef1}>
                        {peliculas.map((peli) => (
                            <MovieCardCarrousel key={peli.id} pelicula={peli} />
                        ))}
                    </div>

                    <button onClick={() => scroll(carruselRef1,'right')} className="carousel-btn right">
                       
                    </button>
                </div>
            )}
        </article>
        
        <article>
            <h2 className="titulo2">Tv Mejor valoradas</h2>
            {loadingTv && <Spinner />}
            {errorTv && <p>Error : {errorTv.message}</p>}
            {!loadingTv && (
                <div className="carousel-container">
                    <button onClick={() => scroll(carruselRef2,'left')} className="carousel-btn left">
                        
                    </button>

                    <div className="carousel" ref={carruselRef2}>
                        {tvShows.map((tv) => (
                            <TvCardCarrousel key={tv.id} tvShow={tv} />
                        ))}
                    </div>

                    <button onClick={() => scroll(carruselRef2,'right')} className="carousel-btn right">
                       
                    </button>
                </div>
            )}
        </article>
        
    </section>
    );
}

export default Home;
