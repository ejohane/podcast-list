import { Request, Response } from "express";
import { podcastRequestHandler } from "../handlers/podcast-handler";
import { SortDirection } from "podcast-list-models";


/**
 * Get a list of podcasts by name.
 *
 * @param req Request
 * @param res Response
 */
export const getPodcasts = async (req: Request, res: Response) => {

    const token = req.headers.authorization

    const name = req.query.name as string

    const sort = req.query.sort
        ? req.query.sort as SortDirection
        : SortDirection.None

    const response = await podcastRequestHandler.handleGetPodcast(token, name, sort)

    res.send(response)

}
