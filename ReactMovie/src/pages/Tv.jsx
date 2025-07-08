import {useState,useEffect} from 'react';
import {buscarTvPopulares} from '../services/tmoviedb';
import TvCard from '../components/TvCard';

function Tv(){
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        setLoading(true);

        buscarTvPopulares()
        .then((shows)=>{
            setTvShows(shows);
            setLoading(false);
        })
        .catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    },[]);

    if(loading) return <p>Loading tv shows...</p>;
    if(error) return <p className='error'>Error : {error}</p>;

    return(
        <div>
            <h2>Tv series</h2>
            <div className='grid-cards'>
                {tvShows &&
                tvShows.map((show)=>(
                    <TvCard key={show.id} tvShow={show} />                    
                )
                )}
            </div>
        </div>
    );
}

export default Tv;