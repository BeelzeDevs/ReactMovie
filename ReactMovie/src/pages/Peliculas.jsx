import { useEffect, useState, useRef, useCallback } from "react";
import {fetchPeliculasPopulares} from '../services/tmoviedb';
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import Tendencias from "../components/Tendencias";
import "./Peliculas.css";

function Home(){
    const [peliculas, setPeliculas] = useState([]);
    const [pagina,setPagina] = useState(1);
    const [more, setMore] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {

      setLoading(true);
      
      if (pagina === 1) setPeliculas([]); // reiniciar el set pél

      fetchPeliculasPopulares(pagina)
        .then((nuevasPelis) => {
          setPeliculas((prev) => pagina === 1 ? nuevasPelis : [...prev, ...nuevasPelis]);
          setMore(nuevasPelis.length > 0);// Si no hay más, se detiene el scroll
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      
        
  }, [pagina]);

  

    // Observador para scroll infinito
    const observer = useRef();

    const ultimaPeli = useCallback((nodo)=>{
      if(loading) return;
      if(observer.current) observer.current.disconnect();// Si hay un observer de useRef, lo desconectamos

      observer.current = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && more){
          setPagina((prev)=> prev + 1);
        }
      });

      if(nodo) observer.current.observe(nodo); //observer que observar el nodo
    },[loading, more]);



    if(error) return <p>Error: {error}</p>;
    return(
        <article className="main">
            <section>
              <h2 className="titulo">Peliculas Populares</h2>
              <ul className="grid-cards">
                  {peliculas &&
                      peliculas.map((pelicula, index)=> {
                        const esUltimaPeli = index === peliculas.length -1;
                        return(
                          <div ref={esUltimaPeli ? ultimaPeli : null} key={pelicula.id}>
                            <MovieCard pelicula={pelicula} />
                          </div>
                        )
                        
                      })
                  }
              </ul>
              {loading && <Spinner />}
            </section>
            <section className="tendenciasContainer">
              <Tendencias movie={true}/>
            </section>
        </article>
    );
}

export default Home;