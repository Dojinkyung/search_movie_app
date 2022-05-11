import { NavLink } from 'react-router-dom'
import styles from './tabBar.module.scss'
import cx from 'classnames'

const TabBar = () => {
  return (
    <nav className={styles.TabBar}>
      <NavLink to='/search' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
        search
      </NavLink>
      <NavLink to='/favorites' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
        favorites
      </NavLink>
    </nav>
  )
}
export default TabBar
