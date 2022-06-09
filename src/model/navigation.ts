import { IMovieListItem } from "./movie";

export interface INavigationRootList {
    Movie?: { search: string };
    MovieDetail?: {movieId: IMovieListItem['imdbID']};
}
