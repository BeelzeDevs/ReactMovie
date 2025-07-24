import { useEffect, useState } from "react";
import { fetchPeliculasTendencia,fetchTvTendencia } from "../services/tmoviedb";
import MovieCardTendencia from "./MovieCardTendencia";
import Spinner from "./Spinner";
import TvCardTendencia from "./TvCardTendencia";
import "./Tendencias.css"

function Tendencias({movie = true}){
    const [pelioTv,setPelioTv] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);

    const [tipoTendencia,setTipoTendencia] = useState('day');
    const [esMovie,setEsMovie] = useState(movie);


    useEffect(()=>{
        setLoading(true);
        const fetchPelioTv = esMovie
        ? ()=> fetchPeliculasTendencia(tipoTendencia)
        : ()=> fetchTvTendencia(tipoTendencia)
        
        fetchPelioTv()
        .then((datos)=>{
            setPelioTv(datos);
            setLoading(false);
        })
        .catch((err)=>{
            setError(err);
            setLoading(false);
        })

    },[tipoTendencia,esMovie]);

    if(error) return <p>Error al cargar tendencias : {error.message}</p>
    return(
        <article>
            {loading && <Spinner />}
            <h2 className="tendencias-titulo">Tendencias</h2>
            <div className="tendencias-subt">
                <p onClick={()=> setTipoTendencia('day')} className={tipoTendencia === "day" ? "activo" : "inactivo"}>Día</p>
                <p onClick={()=> setTipoTendencia('week')} className={tipoTendencia === "week" ? "activo" : "inactivo"}>Semana</p>
            </div>
            <div>
                <ul className="flex-tendenciacards">
                {pelioTv &&
                    esMovie ?
                    pelioTv.slice(0,6).map((item)=>{
                        return(
                        <MovieCardTendencia pelicula={item} key={`Tendencia-${item.id}`}/>
                        );
                    })
                    : pelioTv.slice(0,6).map((item)=>{
                        return(
                        <TvCardTendencia tvShow={item} key={`Tendencia-${item.id}`}/>
                        )
                    })

                    }    
                </ul>
                
            </div>
        </article>
    );
}

export default Tendencias;