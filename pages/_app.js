
import Layout from '../Components/Layout/Layout'
import '../styles/globals.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp
