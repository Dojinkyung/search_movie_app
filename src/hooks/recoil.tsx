import store from 'store'
import { ISearch } from 'types/movie'
import {
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useRecoilCallback,
  RecoilState,
  GetRecoilValue,
  SetRecoilState,
  SetterOrUpdater,
  Resetter,
} from 'recoil'

export { atom, selector, useRecoilState, useSetRecoilState, useRecoilValue, useResetRecoilState, useRecoilCallback }

export type { SetterOrUpdater, Resetter, GetRecoilValue, SetRecoilState }

export function useRecoil<T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>, Resetter] {
  const [value, setter] = useRecoilState(recoilState)
  const resetter = useResetRecoilState(recoilState)
  return [value, setter, resetter]
}

export const FavMovie = atom<ISearch[]>({
  key: '#favMovie',
  default: [] || store.get('fav'),
})

export const page = atom<string>({
  key: '#page',
  default: 'search',
})
export const searchMovie = atom<string>({
  key: '#serachMovie',
  default: '',
})
