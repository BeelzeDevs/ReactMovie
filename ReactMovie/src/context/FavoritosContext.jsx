import { createContext, useContext,useState, useEffect} from 'react';

const favoritosContexto = createContext();

export const useFavoritos = () => useContext(favoritosContexto);

export function FavoritosProvider({children}){
    const [favoritosPeli, setFavoritosPeli] = useState(()=>{
        const favoritosGuardados = localStorage.getItem('favoritosPeli');
        return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
    });

    const [favoritosTv, setFavoritosTv] = useState(()=>{
        const favoritosGuardados = localStorage.getItem('favoritosTv');
        return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
    })

    useEffect(()=>{
        localStorage.setItem('favoritosPeli',JSON.stringify(favoritosPeli));
    }, [favoritosPeli])

    useEffect(()=>{
        localStorage.setItem('favoritosTv',JSON.stringify(favoritosTv));
    },[favoritosTv])

    const AgregarPeliculaFavoritos = (pelicula) => {
        if(!favoritosPeli.find((p)=> p.id === pelicula.id)){
            setFavoritosPeli([...favoritosPeli,pelicula]);
        }
    }
    const QuitarPeliculaDeFavoritos = (pelicula) => {
        setFavoritosPeli(favoritosPeli.filter((p)=> p.id !== pelicula.id));
    }

    const AgregarTvFavoritos = (TvShow) =>{
        if(!favoritosTv.find((tv)=> tv.id === TvShow.id)){
            setFavoritosTv([...favoritosTv,TvShow]);
        }
    }
    const QuitarTvDeFavoritos = (TvShow)=>{
        setFavoritosTv(favoritosTv.filter((tv)=> tv.id !== TvShow.id));
    }

    return (
        <favoritosContexto.Provider value={{favoritosPeli, AgregarPeliculaFavoritos, QuitarPeliculaDeFavoritos,favoritosTv,AgregarTvFavoritos,QuitarTvDeFavoritos}}>
            {children}
        </favoritosContexto.Provider>
    )
}