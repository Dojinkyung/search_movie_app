import styles from './Favorites.module.scss'
import TabBar from 'components/tabbar/tabBar'

import DragDrop from 'components/dragdrop/DragDrop'

const Favorites = () => {
  return (
    <section className={styles.favMovie}>
      <h1>내 즐겨찾기</h1>
      <main className={styles.searched}>
        <h2>Favorite Movies</h2>
        <DragDrop />
      </main>
      <TabBar />
    </section>
  )
}

export default Favorites
