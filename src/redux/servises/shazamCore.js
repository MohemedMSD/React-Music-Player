import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const shazamCoreAPI = createApi({
    reducerPath : 'shazamCoreAPI',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders : (headers)=>{
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
            return headers
        }
    }),
    endpoints : (builder) =>({
        getTopCharts : builder.query({query : () => '/charts/world'}),
        getSongDetails : builder.query({query : (songid) => `/tracks/details?track_id=${songid}`}),
        getSongRelated : builder.query({query : (songid) => `/tracks/related?track_id=${songid}`}),
        getArtistDetails : builder.query({query : (artistId) => `/artists/details?artist_id=${artistId}`}),
        getSongCountry : builder.query({query : (countryCode) => `/charts/country?country_code=${countryCode}`}),
        getSongSearch : builder.query({query : (searchTerm) => `https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
        getSongByGenre : builder.query({query : (genreListId) => `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genreListId}`}),
    }),
})

export const {  useGetTopChartsQuery,
                useGetSongDetailsQuery,
                useGetSongRelatedQuery,
                useGetArtistDetailsQuery, 
                useGetSongCountryQuery,
                useGetSongSearchQuery,
                useGetSongByGenreQuery } = shazamCoreAPI;