const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_URL_BASE;

export async function fetchPeliculasPopulares(){
    const resp = await fetch(`${URL}/movie/popular?language=es-ES&page=1`,{
        headers:{
          Authorization: `Bearer ${API_KEY}`,  
        }}
    );
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.status_message || 'Error al obtener películas');
    }

    return data.results;
    
}