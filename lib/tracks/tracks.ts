import Axios, { AxiosRequestHeaders } from 'axios'

export const fetchTopTracks = async ( time_range: string, header: AxiosRequestHeaders,  stateChanger: React.Dispatch<(prevState: undefined) => any>) => {
    try {

        let tracksResponse = await Axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50`, {'headers': header})
        let trackData = tracksResponse.data.items
        console.log(trackData)
        stateChanger(trackData)
    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }
}

/**
 * This will fetch the recommended tracks of a current track
 */
export const fetchRecommendedTracks = async () => {
    try {

    }
    catch (error) {

    }
}