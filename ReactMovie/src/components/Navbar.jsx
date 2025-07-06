import {Link} from 'react-router-dom';

function Navbar(){
    return(
    <nav className='nav'>
        <Link to="/" className='link-home'>Home</Link>
        <Link to="/favoritos" className='link'>Favoritos</Link>
        <Link to="/tv" className='link'>Tv</Link>
    </nav>
    );
}
export default Navbar;