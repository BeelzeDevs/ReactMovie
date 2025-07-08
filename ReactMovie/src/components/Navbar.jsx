import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {buscarGenerosMovie} from '../services/tmoviedb';

function Navbar(){
    const [generos, setGeneros] = useState([]);
    const [error,setError] = useState();

    useEffect(()=>{
        buscarGenerosMovie()
        .then(setGeneros)
        .catch(setError)

    },[])

    if(error) return <h1>Navbar error: {error}</h1>
    return(
    <nav className='nav'>
        <Link to="/" className='link-home'>Home</Link>
        <Link to="/favoritos" className='link'>Favoritos</Link>
        <Link to="/tv" className='link'>Tv</Link>

        <div className="dropdown link">
            <span >Géneros</span>
            <ul className="dropdown-menu">
            {generos.map((gen) => (
                <li key={gen.id}>
                <Link to={`/genero/${gen.id}`}>{gen.name}</Link>
                </li>
            ))}
            </ul>
      </div>
    </nav>
    );
}
export default Navbar;