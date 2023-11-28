export interface DisplayedManga {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}

export interface MangaList {
  mangaid: number;
  readchapters: number;
  rating: number;
  status: {
    statusid: number;
    statusname: string;
  };
  mangaInfo: {
    title: string;
    image: string;
    type: string;
    chaptercount: number;
  };
}

export interface Manga {
  mangaid: number;
  status: { statusname: string };
  readchapter: number;
  rating: number;
}
