
import Layout from '../Components/Layout/Layout'
import '../styles/globals.css'
import '../styles/index.css'


import { Provider } from 'react-redux'
import store from '../app/store'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <Provider store = { store } >
        <Component {...pageProps} />
      </Provider> */}

       <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp
