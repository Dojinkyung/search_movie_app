export interface ISearch {
  Id?: string
  Fav?: boolean
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface IFav {
  Id: string
  Fav?: boolean
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface IMovieAPIRes {
  Search: ISearch[]
  totalResults: string
  Response: string
}
