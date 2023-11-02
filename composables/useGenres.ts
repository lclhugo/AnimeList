// useGenres.ts
import { ref } from 'vue';
import axios from 'axios';

export function useGenres() {
  const genres = ref([]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
      genres.value = response.data.data;
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const getGenreNameById = genreId => {
    const genre = genres.value.find(gen => gen.mal_id === genreId);
    return genre ? genre.name : '';
  };

  return {
    genres: genres,
    fetchGenres: fetchGenres,
    getGenreNameById: getGenreNameById,
  };
}
