import { getMovieAPI } from 'service/getMovieAPI'
import { useQuery } from 'react-query'
import { IMovieAPIRes, ISearch } from 'types/movie'
import { useEffect, useState } from 'react'
import store from 'store'

const useSearchMovie = (s: string, page: number) => {
  const [movies, setMovies] = useState<ISearch[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [totalResult, setTotalResult] = useState<number>(0)
  const [error, setError] = useState(false)

  const { data, isLoading } = useQuery<IMovieAPIRes>(
    ['getDiseaseInfoAPI', s, page],
    () => getMovieAPI({ s, page }).then((res) => res.data),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  useEffect(() => {
    setMovies([])
  }, [s])
  useEffect(() => {
    if (data?.Response === 'True') {
      const map = new Map()
      for (const character of data.Search) {
        map.set(JSON.stringify(character), character)
      }
      const tmp: ISearch[] = Array.from(map.values())
      tmp.map((movieID: ISearch) =>
        store.get('fav').find((fav: ISearch) => fav.imdbID === movieID.imdbID)
          ? Object.assign(movieID, { Fav: true })
          : Object.assign(movieID, { Fav: false })
      )
      setMovies((prevMovies: Array<ISearch>) => {
        return prevMovies.concat(tmp)
      })
      setHasMore(data.Search.length > 0)
      setTotalResult(parseInt(data.totalResults, 10))
      setError(false)
    }
    if (data?.Response === 'False') {
      setError(true)
    }
  }, [data])

  return { movies, isLoading, error, hasMore, totalResult }
}

export default useSearchMovie
