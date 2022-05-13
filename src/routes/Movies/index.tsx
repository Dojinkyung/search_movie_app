import { useCallback, useRef, useState } from 'react'
import { searchMovie, useRecoilState } from 'hooks/recoil'
import MovieItem from 'components/item/Item'
import styles from './Movie.module.scss'
import useSearchMovie from './useSearchMovie'
import TabBar from 'components/tabbar/tabBar'

const Movie = () => {
  const [search, setSearch] = useRecoilState(searchMovie)
  const [pageNumber, setPageNumber] = useState(1)
  const { movies, hasMore, loading, error, totalResult } = useSearchMovie(search, pageNumber)

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearch(event.currentTarget.value)
    setPageNumber(1)
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const observer = useRef<IntersectionObserver | null>(null)
  const lastBookElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && movies.length < totalResult) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, movies.length, totalResult]
  )

  return (
    <section className={styles.movie}>
      <header>
        <h1>Movie</h1>
        <form onSubmit={onSubmit}>
          <input placeholder='Search Movie!' defaultValue={search || ''} onChange={handleSearch} />
          <button type='submit'>제출</button>
        </form>
      </header>
      <main className={styles.searched}>
        <h2>searched Movies {totalResult || null}</h2>
        <ul className={styles.searchedMovie}>
          {!error && movies ? (
            movies.map((movie, index) => {
              if (movies.length === index + 1) {
                return (
                  <div key={`movie-${movie.Title}-${movie.imdbID}`} ref={lastBookElementRef}>
                    <MovieItem item={movie} />
                  </div>
                )
              }
              return <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
            })
          ) : (
            <div className={styles.noResult}>검색결과가 없습니다.</div>
          )}
          <div className={styles.loadingAndError}>{movies && loading && !error && 'Loading...'}</div>
        </ul>
      </main>
      <footer>
        <TabBar />
      </footer>
    </section>
  )
}
export default Movie
