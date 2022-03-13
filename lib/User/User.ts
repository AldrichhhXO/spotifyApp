import Axios, { AxiosRequestHeaders } from 'axios'
import { SetStateAction } from 'react'

export const fetchProfile = async (access_token: string, userHandler: React.Dispatch<SetStateAction<any>>) => {
    let userUrl = 'https://api.spotify.com/v1/me'
    let requestHeaders = {'Authorization': 'Bearer ' + access_token}
    try {
        let userResponse = await Axios.get('https://api.spotify.com/v1/me', {'headers': requestHeaders})
        userHandler(userResponse.data)
    } catch (error) {
        if (Axios.isAxiosError(error) && error.response.status == 401) {
            console.log('Bad Credentials')
            
        }
    }
    
}