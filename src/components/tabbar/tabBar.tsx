import React from 'react'
import cx from 'classnames'
import styles from './tabBar.module.scss'
import { NavLink } from 'react-router-dom'
import { page, useRecoilState } from 'hooks/recoil'

const TabBar = () => {
  const [, setPage] = useRecoilState(page)
  const handlePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setPage(event.currentTarget.value)
  }

  return (
    <nav className={styles.TabBar}>
      <button type='button' onClick={handlePage} value='search'>
        <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          search
        </NavLink>
      </button>

      <button type='button' onClick={handlePage} value='favorites'>
        <NavLink to='/favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          favorites
        </NavLink>
      </button>
    </nav>
  )
}
export default TabBar
