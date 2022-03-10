import Axios from 'axios'

export const fetchTracks = async (access_token: string, time_range: string) => {
    try {
        let tracksResponse = await Axios.get(`https://api.spotify.com/v1/me/top/artists?limit=20&time_range=${time_range}`)
        let trackData = tracksResponse.data.items
    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }

}