import Axios, { AxiosRequestConfig } from "axios"
import { SortDirection, Show } from "podcast-list-models";

const baseURL = process.env.REACT_APP_API_BASE_URL;

/**
 * Get a list of podcasts by name
 * 
 * @param token The bearer token to access spotify api
 * @param name The name of the podcast to search for
 * @param sort The order in which to return the results
 */
const getPodcasts = async (token: string, name: string, sort: SortDirection = SortDirection.None): Promise<Show[]> => {

    try {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            baseURL,
            params: {
                name: name,
                sort: sort,
            }
        }

        const response = await Axios.get("/podcast", config)

        return response.data as Show[]
    }
    catch (error) {
        console.log(`ERROR: getPodcasts :: ${error}`)
        return []
    }
}

/**
 * The API
 */
export const api = {
    getPodcasts
}