import store from 'store'
import styles from './Favorites.module.scss'
import TabBar from 'components/tabbar/tabBar'
import MovieItem from 'components/item/Item'
import { ISearch } from 'types/movie'
import { useRecoilValue } from 'recoil'
import { FavMovie } from 'hooks/recoil'

const Favorites = () => {
  const t = useRecoilValue(FavMovie)

  return (
    <section className={styles.favMovie}>
      <h1>내 즐겨찾기</h1>
      <main className={styles.searched}>
        <h2>Favorite Movies</h2>
        <ul className={styles.searchedMovie}>
          {t ? (
            store.get('fav').map((movie: ISearch) => {
              return <MovieItem key={`movie-${movie.Title}-${movie.imdbID}`} item={movie} />
            })
          ) : (
            <div className={styles.noResult}>검색결과가 없습니다.</div>
          )}
        </ul>
      </main>
      <TabBar />
    </section>
  )
}

export default Favorites
