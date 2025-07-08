const API_KEY = import.meta.env.VITE_API_KEY;
const URL = import.meta.env.VITE_URL_BASE;

export async function fetchPeliculasPopulares(page = 1){
    const resp = await fetch(`${URL}/movie/popular?language=es-ES&page=${page}`,{
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

export async function buscarPeliculasPorNombre(query){
    const resp = await fetch(`${URL}/search/movie?query=${query}&language=es-ES&page=1`,{
        headers : {
            Authorization : `Bearer ${API_KEY}`
        }
    });
    const data = await resp.json();

    if(!resp.ok){
        throw new Error(data.status_message || 'Error al buscar películas');
    }
    return data.results;
}


export async function buscarTvPopulares(){
    const resp = await fetch(`${URL}/trending/tv/day?language=es-ES`,{
        headers:{
            Authorization: `Bearer ${API_KEY}`
        }
    });
    const data = await resp.json();

    if(!resp.ok){
        throw new Error(data.status_message || 'Error al buscar Tv shows');
    }
    return data.results;
}

export async function buscarGenerosTv(){
    const resp = await fetch(`${URL}/genre/tv/list?language=es-ES`,{
        headers:{
            Authorization:`Bearer ${API_KEY}`
        }
    });

    const data = await resp.json();

    if(!resp.ok){
        throw new Error(data.status_message || 'Error al buscar Géneros Tv');
    }

    return data.genres;
}

export async function buscarGenerosMovie(){
    const resp = await fetch(`${URL}/genre/movie/list?language=es-ES`,{
        headers:{
            Authorization : `Bearer ${API_KEY}`,
        }
    });

    const data = await resp.json();
    
    if(!resp.ok){
        throw new Error(data.status_message || 'Error al buscar Géneros Peliculas');
    }

    return data.genres;
}

export async function buscarPeliculasPorGenero(idGenero, page) {
  const resp = await fetch(`${URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${idGenero}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.status_message || 'Error al buscar películas por género');
    }

  return data.results;
}


export async function buscarPeliculaPorId(id) {
  const resp = await fetch(`${URL}/movie/${id}?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.status_message || "Error al obtener la película");
  }

  return data;
}

export async function buscarVideos(id){
    const resp = await fetch(`${URL}/movie/${id}/videos?language=es-ES`,{
        headers:{
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    const data = await resp.json();

    if(!resp.ok) throw new Error(data.status_message || 'Error al obtener videos')
    
    return data.results;
}