export interface PexelResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}
