import { createContext, useContext,useState, useEffect} from 'react';

const favoritosContexto = createContext();

export const useFavoritos = () => useContext(favoritosContexto);

export function FavoritosProvider({children}){
    const [favoritos, setFavoritos] = useState(()=>{
        const favoritosGuardados = localStorage.getItem('favoritos');
        return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
    });

    useEffect(()=>{
        localStorage.setItem('favoritos',JSON.stringify(favoritos));
    }, [favoritos])

    const AgregarFavoritos = (pelicula) => {
        if(!favoritos.find((p)=> p.id === pelicula.id)){
            setFavoritos([...favoritos,pelicula]);
        }
    }
    const QuitarDeFavoritos = (id) => {
        setFavoritos(favoritos.filter((p)=> p.id !== id));
    }

    return (
        <favoritosContexto.Provider value={{favoritos, AgregarFavoritos, QuitarDeFavoritos}}>
            {children}
        </favoritosContexto.Provider>
    )
}