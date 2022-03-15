import { followers } from "./Types"


export interface SpotifyImage {
    height: number,
    url: string,
    width: number
}



export interface SpotifyMetaData {
    external_urls: any,
    followers: followers, 
    genres: string[],
    href: string,
    id: string,
    images: SpotifyImage[],
    uri: string,

    // Possibly not in both Artist / track / profile
    name: string,
    popularity: number,
    type?: string,
    
    
}


export interface SpotifyArtist extends SpotifyMetaData {

}

export interface SpotifyAlbum {
    
}


export interface SpotifyTrack extends SpotifyMetaData {
    explicit: boolean,
    preview_url: string,
    track_number: number,
    available_markets: string[]
}
