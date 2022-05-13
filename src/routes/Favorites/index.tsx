import styles from './Favorites.module.scss'
import TabBar from 'components/tabbar/tabBar'
import MovieItem from 'components/item/Item'
import { ISearch } from 'types/movie'
import { FavMovie, useRecoilValue } from 'hooks/recoil'

import store from 'store'

const Favorites = () => {
  const tmp = useRecoilValue(FavMovie)

  return (
    <section className={styles.favMovie}>
      <h1>내 즐겨찾기</h1>
      <main className={styles.searched}>
        <h2>Favorite Movies</h2>
        <ul className={styles.searchedMovie}>
          {tmp
            ? store.get('fav').map((movie: ISearch) => {
                return <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
              })
            : null}
        </ul>
      </main>
      <TabBar />
    </section>
  )
}

export default Favorites
