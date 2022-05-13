import cx from 'classnames'
import { FavMovie, useRecoilState } from 'hooks/recoil'
import styles from './modal.module.scss'
import { ISearch } from 'types/movie'

import store from 'store'

interface props {
  item: ISearch
  open: boolean
  close: () => void
}

const Modal = (props: props) => {
  const { open, close, item } = props
  const [, setFavSelect] = useRecoilState(FavMovie)

  const handleEventBtn = () => {
    if (item.Fav === false) {
      item.Fav = true
      store.set('fav', [...store.get('fav'), item])
      setFavSelect(store.get('fav'))
    } else {
      item.Fav = false
      store.set(
        'fav',
        [...store.get('fav')].filter((fav: ISearch) => fav.imdbID !== item?.imdbID)
      )
      setFavSelect(store.get('fav'))
    }
    close()
  }

  return (
    <div className={cx({ [styles.bg]: open })}>
      <div className={cx({ [styles.modalActive]: open })}>
        <div className={styles.area}>
          <p className={styles.info}>
            {item.Title}(을)를 {item.Fav ? '삭제' : '추가'}하시겠습니까?
          </p>
          <button type='button' className={styles.btn} onClick={close}>
            취소
          </button>
          <button type='button' className={styles.btn} onClick={handleEventBtn}>
            즐겨찾기 {item.Fav ? '삭제' : '추가'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Modal
