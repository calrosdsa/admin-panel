import store from '@/context/store'
import '@/styles/globals.css'
import "@/styles/App.css"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import useEffectOnce from '@/utils/hooks/useEffectOnce'
import { useAppDispatch } from '@/context/reduxHooks'
import { getSettings, getUserData } from '@/context/actions/authActions'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
 
  return(
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>

  ) 
}
