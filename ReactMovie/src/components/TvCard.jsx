import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {buscarGenerosTv} from '../services/tmoviedb';

function TvCard({tvShow}){
    const imagen = `https://image.tmdb.org/t/p/w300${tvShow.poster_path}`;
    const [hover, setHover] = useState(false);
    const [generos,setGeneros]= useState([]);
    const [error,setError] = useState(null);

    const HoverImg = () =>{
        setHover(true);
    }
    const desactivarHoverImg = () =>{
        setHover(false);
    }

    useEffect(()=>{
        buscarGenerosTv()
        .then((gen)=>{
            setGeneros(gen);
        })
        .catch((err)=>{
            setError(err.message);
        });
    },[])


    if(error) return <p>Error: {error}</p>

    return(
        <div className="cardTv" onMouseLeave={desactivarHoverImg} onMouseEnter={HoverImg}>
            <Link to={`/tv/${tvShow.id}`} >
                <img src={imagen} alt={tvShow.name} className="card-img" />
                <button ></button>
            </Link>
            
            {hover &&
                <div className="card-overviewInfor" >
                    <header className="title">
                        <h4>{tvShow.name}</h4>
                    </header>
                    <section className="info">
                        <p>⭐{tvShow.vote_average.toString().slice(0,4)}</p>
                        <span>{tvShow.first_air_date.slice(0,4)}</span>
                    </section>
                    <section className="description">
                        <p >{tvShow.overview.slice(0,120)}</p>
                        <div className="generos">
                            <span >Género: </span>
                            <span>
                                {tvShow.genre_ids.map(element=> (
                                    generos.find((g)=> g.id === element).name
                                )
                                ).join(', ')}
                            </span>
                        </div>
                    </section>
                </div>
            }
        </div>
    );
}

export default TvCard;