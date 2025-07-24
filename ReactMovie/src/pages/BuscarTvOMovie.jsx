import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {buscarPeliOTvShow} from '../services/tmoviedb';
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";

function BuscarTvOMovie(){
    const {busqueda} = useParams();
    const [pelisOTv, setPelisOTv] = useState([]);
    const [error,setError] = useState(null);
    const [loading, setloading] = useState(true);
    const [pagina, setPagina] = useState(1);
    const [more,setMore] = useState(true);
    
    useEffect(()=>{
        setloading(true);

        buscarPeliOTvShow(busqueda,pagina)
        .then((datos)=>{
            const datosFiltrados = datos.filter((item)=> item.media_type === 'tv' || item.media_type === 'movie');
            setPelisOTv((prev) => {
            const combinado = [...prev, ...datosFiltrados];
            const unicos = Array.from(
                new Map(combinado.map(item => [`${item.id}`, item])).values()
            );
            return unicos;
            });
            setMore(datosFiltrados.length > 0);
            setloading(false);
        })
        .catch((err)=>{
            setError(err);
            setloading(false);
        })

    },[busqueda,pagina]);

    useEffect(()=>{
        setloading(true);
        setPelisOTv([]);
    },[busqueda]);

    const observer = useRef();
    const ultimaPeliOTv = useCallback((nodo)=>{
        if(loading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && more)
                setPagina((prev)=> prev + 1);
        });
        
        if(nodo) observer.current.observe(nodo); //observer que observar el nodo

    },[loading,more]);

    if(error) return <h2>Error : {error.message}</h2>
    return(
        <section className="main2">
            {pelisOTv &&
            <h2 className="titulo2">Search</h2>
            }
            {loading && <Spinner /> }

            {pelisOTv && 
            <ul className="grid-cards">
            {pelisOTv.map((item,index)=>{
                const esMovie = item.media_type === "movie";
                const esUltimaPelioTv = index === pelisOTv.length -1;    
                const keyUnico = `${item.media_type}-${item.id}`;

                const elemento = (
                    <div ref={esUltimaPelioTv ? ultimaPeliOTv : null} key={keyUnico}>
                        {esMovie ? (
                            <MovieCard pelicula={item}  />
                        ): (
                            <TvCard tvShow={item} />
                        )}
                    </div>
                )
                 
                return elemento;
            })}
            </ul>
            }
        </section>
    );
}

export default BuscarTvOMovie;