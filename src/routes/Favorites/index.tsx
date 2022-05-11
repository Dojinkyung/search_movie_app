import styles from './Favorites.module.scss'
import TabBar from 'components/tabbar/tabBar'
import MovieItem from 'components/item/Item'
import { ISearch } from 'types/movie'

const Favorites = () => {
  // const fav = () => {
  //   store.each((value, key) => {
  //     console.log(key, '==', value)
  //   })
  // }

  return (
    <section className={styles.favMovie}>
      <h1>내 즐겨찾기</h1>
      <main className={styles.searched}>
        <h2>Favorite Movies</h2>
        <ul className={styles.searchedMovie}>
          {/* {fav ? (
            fav.map((movie: ISearch, index: number) => {
              return <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
            })
          ) : (
            <div className={styles.noResult}>검색결과가 없습니다.</div>
          )} */}
        </ul>
      </main>
      <TabBar />
    </section>
  )
}

export default Favorites
