import { useState } from 'react'

import styles from './item.module.scss'
import { ISearch } from 'types/movie'
import Modal from 'components/modal/modal'
import { StarIcon } from 'assets/svgs'

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
    <li className={styles.movieList}>
      <button className={styles.movieBtn} type='button' onClick={openReq}>
        <img src={item.Poster} alt={item.Title} />
        <span className={styles.movieInfo}>
          <h1 className={styles.title}>{item.Title}</h1>
          <div className={styles.info}>Year:{item.Year}</div>
          <div className={styles.info}>Type:{item.Type}</div>
        </span>
        {item.Fav ? <StarIcon /> : null}
      </button>{' '}
      {isOpen ? <Modal item={item} open={isOpen} close={closeReq} /> : null}
    </li>
  )
}

export default MovieItem
