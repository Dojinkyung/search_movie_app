import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovie, useRecoilState } from 'hooks/recoil'
import styles from './Movie.module.scss'
import TabBar from 'components/tabbar/tabBar'
import store from 'store'
import debounce from 'lodash.debounce'

import MovieItem from 'components/item/Item'
import useSearchMovie from 'service/useSearchMovie'

const Movie = () => {
  const [search, setSearch] = useRecoilState(searchMovie)
  const [pageNumber, setPageNumber] = useState(1)

  const { movies, isLoading, error, hasMore, totalResult } = useSearchMovie(search, pageNumber)

  const debouncedResults = useMemo(() => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setSearch(event.target.value.trim())
      setPageNumber(1)
    }
    if (!store.get('fav')) {
      store.set('fav', [])
    }
    return debounce(handleChange, 800)
  }, [setSearch])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const observer = useRef<IntersectionObserver | null>(null)
  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && movies.length < totalResult) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore, isLoading, movies.length, totalResult]
  )

  return (
    <section className={styles.movie}>
      <header>
        <h1>Movie</h1>
        <form onSubmit={onSubmit}>
          <input placeholder='Search Movie!' defaultValue={search || ''} onChange={debouncedResults} />
          <button type='submit'>제출</button>
        </form>
      </header>
      <main className={styles.searched}>
        <h2>searched Movies</h2>
        <ul className={styles.searchedMovie}>
          {!error && movies ? (
            movies.map((movie, index) => {
              if (movies.length === index + 1) {
                return (
                  <li key={`movie-${movie.Title}-${movie.imdbID}`} ref={lastBookElementRef}>
                    <MovieItem item={movie} />
                  </li>
                )
              }
              return (
                <li key={`movie-${movie.Title}-${movie.imdbID}`}>
                  <MovieItem item={movie} />
                </li>
              )
            })
          ) : (
            <div className={styles.noResult}>검색결과가 없습니다.</div>
          )}
          <div className={styles.loadingAndError}>{movies && isLoading && 'Loading...'}</div>
        </ul>
      </main>
      <footer>
        <TabBar />
      </footer>
    </section>
  )
}
export default Movie
