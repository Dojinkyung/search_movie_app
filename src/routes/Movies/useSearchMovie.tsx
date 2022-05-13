import store from 'store'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { ISearch } from 'types/movie'

const useSearchMovie = (searchMovie: string, pageNumber: number) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [movies, setMovies] = useState<ISearch[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [totalResult, setTotalResult] = useState<number>(0)
  useEffect(() => {
    setMovies([])
  }, [searchMovie])

  useEffect(() => {
    setLoading(true)
    setError(false)

    const { CancelToken } = axios
    let cancel: any

    axios({
      method: 'GET',
      url: 'https://www.omdbapi.com/',
      params: { apikey: process.env.REACT_APP_MOVIE_API, s: searchMovie, page: pageNumber },
      cancelToken: new CancelToken((c) => {
        cancel = c
      }),
    })
      .then((res) => {
        const map = new Map()
        for (const character of res.data.Search) {
          map.set(JSON.stringify(character), character)
        }
        const tmp: ISearch[] = Array.from(map.values())

        tmp.map((movie: ISearch) =>
          store.get('fav').find((fav: ISearch) => fav.imdbID === movie.imdbID)
            ? Object.assign(movie, { Fav: true })
            : Object.assign(movie, { Fav: false })
        )

        setMovies((prevMovies: Array<ISearch>) => {
          return prevMovies.concat(tmp)
        })
        setTotalResult(parseInt(res.data.totalResults, 10))
        setHasMore(res.data.Search.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [searchMovie, pageNumber])

  return { movies, hasMore, loading, error, totalResult }
}

export default useSearchMovie
