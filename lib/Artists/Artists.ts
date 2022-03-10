import Axios, { AxiosRequestHeaders } from 'axios'
import React from 'react'

export const fetchArtists = async (access_token: string, time_range: string, headers: AxiosRequestHeaders, stateChanger: React.Dispatch<(prevState: undefined) => any>) => {
    try {
        let artistsResponse = await Axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time_range}`, {'headers': headers})
        let artistsData = artistsResponse.data.items
        stateChanger(artistsData)

    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }
}

