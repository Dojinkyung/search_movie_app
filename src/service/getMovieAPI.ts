import axios from 'axios'

interface Params {
  s: string
  page: number
}

const BASE_URL = 'https://www.omdbapi.com/'

export const getMovieAPI = (params: Params) =>
  axios({
    method: 'GET',
    url: `${BASE_URL}`,
    params: {
      apikey: process.env.REACT_APP_MOVIE_API,
      ...params,
    },
  })
