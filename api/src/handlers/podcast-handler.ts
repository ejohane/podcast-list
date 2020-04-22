import { spotifyApi } from "../spotify-api/spotify-api"
import { SortDirection, Show } from "podcast-list-models"

/**
 * Handles the getPodcasts request
 *
 * @param token The bearer token to access spotify api
 * @param name The name of the podcast to search for
 * @param sort The order in which to sort the results
 */
const handleGetPodcasts = async (token: string, name: string, sort: SortDirection): Promise<Show[]> => {

    const result = await spotifyApi.searchShow(token, name)

    const shows = result.shows.items.map((show: any) => ({
        id: show.id,
        description: show.description,
        name: show.name,
        publisher: show.publisher,
        imageUrl: show.images[0].url
    })) as Show[]

    if (sort === SortDirection.None) {
        return shows
    }

    return shows.sort((a, b) => {

        if (a.name > b.name) {
            return sort === SortDirection.Descending
                ? -1
                : 1
        }

        if (b.name > a.name) {
            return sort === SortDirection.Descending
                ? 1
                : -1
        }

        return 0
    })
}

/**
 * Handles podcast requests
 */
export const podcastRequestHandler = {
    handleGetPodcast: handleGetPodcasts
}