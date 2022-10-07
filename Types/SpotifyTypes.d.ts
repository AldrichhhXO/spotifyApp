/**
 * Spotify Album Data
 */
export type SpotifyAlbum = {
    album_type: string,
    id: string,
    images: SpotifyImage,
    name: string,
    release_date: string,
    release_day_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}

/**
 * Spotify Artist Data
 */
export interface SpotifyArtist {
    external_urls: string,
    followers: {
      href: null,
      total: number
    },
    genre: Array<string>,
    href: string,
    id: string,
    images: Array<SpotifyImage>,
    name: string,
    popularity: number,
    type: string
    uri: string
  }

  /**
   * Spotify Track data.
   */
  export interface SpotifyTrack {
    album: SpotifyAlbum,
    artists: Array<Object>,
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: Object,
    external_urls: Object,
    href: string,
    id: string,
    is_local: boolean,
    is_playable: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}

/**
 * Spotify Image Data
 */
export type SpotifyImage =  {
    height: number,
    url: string,
    width: number
}