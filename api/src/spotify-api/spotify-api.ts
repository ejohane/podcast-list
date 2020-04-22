import Axios, { AxiosRequestConfig } from "axios";

/**
 * Search for a podcast show by name.
 *
 * @param token The bearer token to access spotify api
 * @param name The name of the podcast to search for
 */
const searchShow = async (token: string, name: string): Promise<any> => {

    const baseURL = process.env.SPOTIFY_BASE_URL

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: token
        },
        baseURL,
        params: {
            q: name,
            type: "show",
            limit: 50
        }
    }

    try {
        const response = await Axios.get("/search", config)

        return response.data;
    } catch (exception) {
        console.log(exception)
        throw (exception)
    }


}

export const spotifyApi = {
    searchShow
}
