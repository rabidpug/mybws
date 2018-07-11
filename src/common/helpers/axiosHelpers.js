import axios from 'axios'
import { getPath, } from 'utilibelt'
import { toast, } from 'react-toastify'

export const configureAxios = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' )

  axios.defaults.headers.common.refreshtoken = localStorage.getItem( 'refreshToken' )
}
export const authedAxios = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' )

  axios.defaults.headers.common.refreshtoken = localStorage.getItem( 'refreshToken' )

  axios.interceptors.response.use( res => {
    if ( res && getPath( res, 'data.user' ) && !res.handled ) {
      const { error, } = res.data

      error && toast.error( error )

      configureAxios()

      res.handled = true
    }

    return Promise.resolve( res )
  },
                                   e => Promise.reject( e ) )

  return axios
}
