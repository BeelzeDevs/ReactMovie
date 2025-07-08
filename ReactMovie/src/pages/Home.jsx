import { useEffect, useState, useRef, useCallback } from "react";
import {fetchPeliculasPopulares, buscarPeliculasPorNombre} from '../services/tmoviedb';
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";


function Home(){
    const [peliculas, setPeliculas] = useState([]);
    const [pagina,setPagina] = useState(1);
    const [more, setMore] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [busqueda,setBusqueda] = useState('');
    const [queryFinal,setQueryFinal] = useState('');
    
  
    useEffect(() => {

      setLoading(true);
      
      if (pagina === 1) setPeliculas([]); // reiniciar el set péliculas

      const fetchPeliculas = queryFinal.trim() === ''
        ? () => fetchPeliculasPopulares(pagina)
        : () => buscarPeliculasPorNombre(queryFinal);

      fetchPeliculas()
        .then((nuevasPelis) => {
          setPeliculas((prev) => pagina === 1 ? nuevasPelis : [...prev, ...nuevasPelis]);
          setMore(nuevasPelis.length > 0);// Si no hay más, se detiene el scroll
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      
        
  }, [queryFinal, pagina]);


  useEffect(() => {
    setPagina(1);  // Reiniciar paginación
  }, [queryFinal]);

    const handleInputChange = e =>{
        setBusqueda(e.target.value);
    }
    const handleSubmit = e =>{
        e.preventDefault();
        setQueryFinal(busqueda);
    }

  

    // Observador para scroll infinito
    const observer = useRef();

    const ultimaPeli = useCallback((nodo)=>{
      if(loading) return;
      if(observer.current) observer.current.disconnect();// Si hay un observer de useRef, lo desconectamos

      observer.current = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && more){
          setPagina((prev)=> prev +1);
        }
      });

      if(nodo) observer.current.observe(nodo); //observer que observar el nodo
    },[loading, more]);

    if(error) return <p>Error: {error}</p>;
    return(
        <div>
            <h2 className="titulo">Peliculas Populares</h2>

            <form onSubmit={handleSubmit} className="busqueda-container">
                <input 
                type="text"
                placeholder="Buscar peliculas.."
                value={busqueda}
                onChange={handleInputChange}
                className="barra-busqueda"
                />
                <button type="submit" className="busqueda-btn"><span className="busqueda-img"></span></button>
            </form>

            <ul className="grid-cards">
                {peliculas &&
                    peliculas.map((pelicula, index)=> {
                      const esUltimaPeli = index === peliculas.length -1;
                      return(
                        <div ref={esUltimaPeli ? ultimaPeli : null} key={pelicula.id}>
                          <MovieCard key={pelicula.id} pelicula={pelicula} />
                        </div>
                      )
                      
                    })
                }
            </ul>
            {loading && <Spinner />}
        </div>
    );
}

export default Home;