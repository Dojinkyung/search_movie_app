// https://github.com/axios/axios
import axios, { AxiosError } from 'axios'

const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError => {
  return axios.isAxiosError(err)
}

export { isAxiosError }
