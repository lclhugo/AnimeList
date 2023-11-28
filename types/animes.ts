export interface DisplayedAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}

export interface AnimeList {
  animeid: number;
  watchedepisodes: number;
  rating: number;
  status: {
    statusid: number;
    statusname: string;
  };
  animeInfo: {
    title: string;
    image: string;
    type: string;
    episodecount: number;
  };
}

export interface Anime {
  animeid: number;
  status: { statusname: string };
  watchedepisodes: number;
  rating: number;
}
