import { useState } from 'react'
import cx from 'classnames'

import styles from './item.module.scss'
import { ISearch } from 'types/movie'
import Modal from 'components/modal/modal'

interface Props {
  item: ISearch
}

const MovieItem = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const openReq = () => {
    setIsOpen(true)
  }
  const closeReq = () => {
    setIsOpen(false)
  }

  return (
    <li className={cx(styles.movieList, { [styles.selected]: item.Fav === true })}>
      <button className={styles.movieBtn} type='button' onClick={openReq}>
        <img src={item.Poster} alt={item.Title} />
        <span className={styles.movieInfo}>
          <div className={styles.title}>{item.Title}</div>
          <div className={styles.info}>Year:{item.Year}</div>
          <div className={styles.info}>Type:{item.Type}</div>
        </span>
      </button>
      {isOpen ? <Modal item={item} open={isOpen} close={closeReq} /> : null}
    </li>
  )
}

export default MovieItem
