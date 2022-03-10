import Axios, { AxiosRequestHeaders } from 'axios'

export const fetchTracks = async (access_token: string, time_range: string, headers: AxiosRequestHeaders, stateChanger: React.Dispatch<(prevState: undefined) => any>) => {
    try {
        let tracksResponse = await Axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time_range}`)
        let trackData = tracksResponse.data.items
        stateChanger(trackData)
    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }

}