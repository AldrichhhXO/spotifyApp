import Axios, { AxiosRequestHeaders } from 'axios'
import React from 'react'

/**
 * Fetches the user's Top artists, based on a specific time range.
 * @param time_range The time range of the analytic
 * @param headers The headers containing the access token
 * @param stateChanger SetState changer for react component.
 */
export const fetchArtists = async ( time_range: string, headers: AxiosRequestHeaders, stateChanger: React.Dispatch<(prevState: undefined) => any>) => {
    try {
        let artistsResponse = await Axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${time_range}`, {'headers': headers})
        let artistsData = artistsResponse.data.items
        stateChanger(artistsData)

    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }
}

/**
 * @description Fetches the related artists based on the parameter Artist
 * @param artistId The spotify Artist's ID
 * @param headers The request headers containing the Access Token
 * @param stateChanger SetState Function to update the component
 */
export const fetchRelatedArtists = async (artistId : string, headers: AxiosRequestHeaders, stateChanger) => {
    try {
        let relatedArtistsResponse = await Axios.get(` https://api.spotify.com/v1/artists/${artistId}/related-artists`, {'headers': headers })
        let relatedArtists = relatedArtistsResponse.data.artists
        stateChanger(relatedArtists)
    }
    catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }
}

/**
 * @description Fetches the Artist's Top Tracks
 * @param artistId The spotify Artist's ID
 * @param headers The request Headers containing the Access Token
 * @param stateChanger SetState Function to update the Component
 */
export const fetchArtistsTopTracks  = async (artistId: string, headers: AxiosRequestHeaders, stateChanger) => {
    try {
        let artistsTopTracksResponse = await Axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {'headers': headers})
        let topTracks = artistsTopTracksResponse.data.tracks
        stateChanger(topTracks)
    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.status)
    }
}

/**
 * @description Checks if the current user is following the selected Artist
 * @param artistId The Artist that is being Checked
 * @param headers The Access Code Headers
 * @param stateChanger 
 */
export const ArtistCheck = async (artistId: string, headers: AxiosRequestHeaders, stateChanger) => {
    try {
        console.log(headers)
        let artistCheckResponse = await Axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, {'headers': headers})
        let artistCheck = artistCheckResponse.data
        stateChanger(artistCheck)
    } catch (error) {
        if (Axios.isAxiosError(error)) console.log(error.response.data)
    }
}