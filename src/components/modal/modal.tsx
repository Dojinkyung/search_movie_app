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
    store.set('fav', [...store.get('fav'), item])
    setFavSelect(store.get('fav'))
    close()
  }
  return (
    <div className={cx({ [styles.bg]: open })}>
      <div className={cx({ [styles.modalActive]: open })}>
        {open ? (
          <div className={styles.area}>
            <p className={styles.info}>{item.Title}를 즐겨찾기에 추가하시겠습니까?</p>
            <button type='submit' className={styles.btn} onClick={close}>
              취소
            </button>
            <button type='submit' className={styles.btn} onClick={handleEventBtn}>
              즐겨찾기 추가
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Modal
