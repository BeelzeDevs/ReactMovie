import { useParams } from "react-router-dom";
import {buscarPeliculasPorGenero,buscarGenerosMovie} from '../services/tmoviedb';
import { useEffect, useState,useRef , useCallback} from "react";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

function DetalleGenero() {
    const {id} = useParams();

    const [peliculas,setPeliculas] = useState([]);
    const [more,setMore] = useState(false);
    const [pagina,setPagina] = useState(1);
    
    const [genero,setGenero] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        
        buscarPeliculasPorGenero(id,pagina)
        .then((pelis=>{
            setPeliculas((prev) => pagina === 1 ? pelis : [...prev,...pelis]);
            setMore(pelis.length > 0);
            setLoading(false);
        }))
        .catch((err)=>{
            setError(err.message);
            setLoading(false);
        })


    },[id,pagina]);

    useEffect(()=>{
        setLoading(true);
        setPeliculas([]); 
        setPagina(1);

        buscarGenerosMovie()
        .then((gen)=>{
            const generoEncontrado = gen.find((p)=> p.id === parseInt(id));
            if(generoEncontrado){
                setGenero(generoEncontrado);
            }else{
                setGenero('Género desconocido');
            }

        })
        .catch(setError)
        .finally(setLoading(false));
    },[id]);

    // observador
    const observer = useRef();

    const ultimaPeli = useCallback((nodo)=>{

        if(loading) return;
        if(observer.current) observer.current.disconnect();// Si hay un observer de useRef, lo desconectamos

        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && more){
                setPagina((prev) => prev + 1);
            }
        }) 

        if(nodo) observer.current.observe(nodo);//observer que observar el nodo
    },[loading,more]);

    if(error) return <h2>Error: {error}</h2>
    return (
        <article className="main2">
            <section>
                <h2 className="titulo2">{genero.name}</h2>

                <ul className="grid-cards">
                    {peliculas && peliculas.map((peli,index)=>{
                        const esUltimaPeli = index === peliculas.length - 1;   
                        
                        return (
                            <div ref={esUltimaPeli ? ultimaPeli : null} key={peli.id}>
                                <MovieCard pelicula={peli} />
                            </div>
                            );
                    })
                    }
                </ul>
                {loading && <Spinner />}
            </section>
        </article>
    );

}

export default DetalleGenero;