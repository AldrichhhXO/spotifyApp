import Link from 'next/link'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import Layout from './Components/Layout'
import Axios from 'axios'

export default function Home() {

  const [name, setName] = useState('')

  const loginToSpotify = async () => {
    let response = await Axios.get('/api/login')
    alert(await response.data.name)
  }

  return (
    <Layout>
        <h2 className="text-red-700 text-2xl">Testing</h2>
        <button onClick = {loginToSpotify}>Log In</button>
    </Layout>
  )
}
