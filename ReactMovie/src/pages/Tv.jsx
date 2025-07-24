import {useState,useEffect} from 'react';
import {fetchTvPopulares} from '../services/tmoviedb';
import TvCard from '../components/TvCard';
import Tendencias from '../components/Tendencias';
import flechaAnterior from '../img/flechaAnterior.svg';
import flechaPosterior from '../img/flechaPosterior.svg';
import "./Tv.css";

function Tv(){
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=>{
        setLoading(true);

        fetchTvPopulares(pagina)
        .then((shows)=>{
            setTvShows(shows);
            setHasMore(shows.length > 0);
            setLoading(false);
        })
        .catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    },[pagina]);

    const siguientePagina = () => {
        if (hasMore) setPagina(prev => prev + 1);
    };

    const anteriorPagina = () => {
        if (pagina > 1) setPagina(prev => prev - 1);
    };

    if(loading) return <p>Loading tv shows...</p>;
    if(error) return <p className='error'>Error : {error}</p>;

    return(
        <article className='main'>
            <section>
                <h2 className='titulo'>Tv Populares</h2>
                <ul className='grid-cards'>
                    {tvShows &&
                    tvShows.map((show)=>(
                        <TvCard key={show.id} tvShow={show} />                    
                    )
                    )}
                </ul>
                <div className="paginacion">
                    <button onClick={anteriorPagina} disabled={pagina === 1}>
                        <img src={flechaAnterior} alt="pagina anterior" />
                    </button>
                    {pagina-1 > 0 &&
                        <span onClick={anteriorPagina} className='pagebtn'>{pagina-1 }</span>
                    }
                    <span className='pagebtn selected'>{pagina}</span>
                    {hasMore &&
                    <span onClick={siguientePagina} className='pagebtn'>{pagina+1}</span>
                    }
                    <button onClick={siguientePagina} disabled={!hasMore}>
                        <img src={flechaPosterior} alt="pagina siguiente" />
                    </button>
                </div>
            </section>
            <section className='tendenciasContainer'>
              <Tendencias movie={false}/>
            </section>
        </article>
    );
}

export default Tv;