import axios from 'axios';
import type { Genres } from '~/types/genres';

export function useGenres() {
  const genres = ref([] as Genres[]);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
      genres.value = response.data.data;
    } catch (error) {
      console.error('Error fetching genre data:', error);
    }
  };

  const getGenreNameById = (genreId: string) => {
    const parsedGenreId = parseInt(genreId);
    const genre = genres.value.find(gen => gen.mal_id === parsedGenreId);
    return genre ? genre.name : '';
  };

  return {
    genres: genres,
    fetchGenres: fetchGenres,
    getGenreNameById: getGenreNameById,
  };
}
