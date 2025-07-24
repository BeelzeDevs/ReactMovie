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
export async function fetchPeliculasTendencia(time = 'day'){
  const resp = await fetch(`${URL}/trending/movie/${time}?language=es-ES`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await resp.json();
  if(!resp.ok) throw new Error(data.status_message || 'Error al obtener películas tendencia');

  return data.results;
}

// export async function buscarPeliculasPorNombre(query){
//     const resp = await fetch(`${URL}/search/movie?query=${query}&language=es-ES&page=1`,{
//         headers : {
//             Authorization : `Bearer ${API_KEY}`
//         }
//     });
//     const data = await resp.json();

//     if(!resp.ok){
//         throw new Error(data.status_message || 'Error al buscar películas');
//     }
//     return data.results;
// }


export async function fetchTvPopulares(page = 1){
    const resp = await fetch(`${URL}/tv/popular?language=es-ES&page=${page}`,{
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

export async function fetchTvTendencia(time = 'day'){
  const resp = await fetch(`${URL}/trending/tv/${time}?language=es-ES`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await resp.json();
  if(!resp.ok) throw new Error(data.status_message || 'Error al obtener películas tendencia');

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

export async function buscarPeliculasPorGenero(idGenero, page = 1) {
  const resp = await fetch(`${URL}/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc&with_genres=${idGenero}`, {
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

export async function buscarVideosMovie(id){
    const resp = await fetch(`${URL}/movie/${id}/videos?language=es-ES`,{
        headers:{
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    const data = await resp.json();

    if(!resp.ok) throw new Error(data.status_message || 'Error al obtener videos')
    
    return data.results;
}


export async function buscarTvShowPorId(id) {
  const resp = await fetch(`${URL}/tv/${id}?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.status_message || "Error al obtener el show de Tv");
  }

  return data;
}

export async function buscarVideosTvShow(id){
    const resp = await fetch(`${URL}/tv/${id}/videos?language=es-ES`,{
        headers:{
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    const data = await resp.json();

    if(!resp.ok) throw new Error(data.status_message || 'Error al obtener videos')
    
    return data.results;
}


export async function buscarTvShowRecommendations(id){
  const resp = await fetch(`${URL}/tv/${id}/recommendations?language=es-ES&page=1`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`,
    }
  })
  const data = await resp.json();
  if(!resp.ok) throw new Error(data.status_message || 'Error al obtener recomendaciones de Tv Show');

  return data.results;

}

export async function buscarTvSeasonEpisodes(id,seasonNumber = 1){
    const resp = await fetch(`${URL}/tv/${id}/season/${seasonNumber}?language=es-ES`,{
        headers:{
          Authorization: `Bearer ${API_KEY}`
        }
    });

    const data = await resp.json();
    if(!resp.ok) throw new Error(data.status_message || 'Error al buscar los episodios de la temporada de Tv');

    return data.episodes;
}

export async function buscarPeliOTvShow(busqueda,page){
  const resp = await fetch(`${URL}/search/multi?query=${busqueda}&language=es-ES&page=${page}`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await resp.json();
  if(!resp.ok) throw new Error( data.status_message || 'Error al buscar Peliculas y Tv Shows');

  return data.results;
}

export async function fetchPeliculasMejorValoradas(page = 1){
  const resp = await fetch(`${URL}/movie/top_rated?language=es-ES&page=${page}`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await resp.json();
  if(!resp.ok) throw new Error( data.status_message || 'Error al buscar - Peliculas mejor valoradas');

  return data.results;
}
export async function fetchTvMejorValoradas(page = 1){
  const resp = await fetch(`${URL}/tv/top_rated?language=es-E&page=${page}`,{
    headers:{
      Authorization: `Bearer ${API_KEY}`
    }
  });
  const data = await resp.json();
  if(!resp.ok) throw new Error( data.status_message || 'Error al buscar - Tv mejor valoradas');

  return data.results;
}