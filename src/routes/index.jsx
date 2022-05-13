import styles from './Routes.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Movie from './Movies'
import Favorites from './Favorites'
import { RecoilRoot } from 'recoil'

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path='/' element={<Movie />} />
            <Route path='search' element={<Movie />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  )
}

export default App
