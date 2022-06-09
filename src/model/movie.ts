export interface IMovieListItem {
    Type: "movie" | "series" | "episode";
    Title:string;
    Poster:string;
    Year:string;
    imdbID:string;
}

export interface IMovie extends IMovieListItem {
    Rated:string;
    Released:string;
    Runtime:string;
    Genre:string;
    Director:string;
    Writer:string;
    Actors:string;
    Plot:string;
    Language:string;
    Country:string;
    Awards:string;
    Ratings:Array<IRating>,
    Metascore:string;
    imdbRating:string;
    imdbVotes:string;
    DVD:string;
    BoxOffice:string;
    Production:string;
    Website:string;
}

export interface IRating {
    Source:string;
    Value:string;
}
