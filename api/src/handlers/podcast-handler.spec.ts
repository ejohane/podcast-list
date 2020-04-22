import { spotifyApi } from "../spotify-api/spotify-api"
import { mocked } from 'ts-jest/utils';
import { Show, SortDirection } from "podcast-list-models"
import { podcastRequestHandler } from "./podcast-handler"

jest.mock("../spotify-api/spotify-api")

describe("The podcastRequestHandler.handleGetPodcasts function", () => {

    const fakeShow1 = {
        id: "fake id 1",
        description: "fake descripion 1",
        name: "a",
        publisher: "fake publisher 1",
        images: [{ url: "fake url 1" }]
    }

    const fakeShow2 = {
        id: "fake id 2",
        description: "fake descripion 2",
        name: "b",
        publisher: "fake publisher 2",
        images: [{ url: "fake url 2" }]
    }

    const fakeShow3 = {
        id: "fake id 3",
        description: "fake descripion 3",
        name: "c",
        publisher: "fake publisher 3",
        images: [{ url: "fake url 3" }]
    }

    const expectedShow1: Show = {
        id: "fake id 1",
        description: "fake descripion 1",
        name: "a",
        publisher: "fake publisher 1",
        imageUrl: "fake url 1"
    }

    const expectedShow2: Show = {
        id: "fake id 2",
        description: "fake descripion 2",
        name: "b",
        publisher: "fake publisher 2",
        imageUrl: "fake url 2"
    }

    const expectedShow3: Show = {
        id: "fake id 3",
        description: "fake descripion 3",
        name: "c",
        publisher: "fake publisher 3",
        imageUrl: "fake url 3"
    }

    it("should return a list of shows in ascending order when passed the Ascending sort direction", async () => {
        const expectedResult = [
            expectedShow1,
            expectedShow2,
            expectedShow3,
        ]

        mocked(spotifyApi.searchShow).mockImplementation(async (token, name) => {
            return {
                shows: {
                    items: [
                        fakeShow2,
                        fakeShow3,
                        fakeShow1
                    ]
                }
            }
        })

        const result = await podcastRequestHandler.handleGetPodcast("fake token", "fake name", SortDirection.Ascending)

        expect(result).toEqual(expectedResult)
    })

    it("should return a list of shows in descending order when passed the Descending sort direction", async () => {
        const expectedResult = [
            expectedShow3,
            expectedShow2,
            expectedShow1,
        ]

        mocked(spotifyApi.searchShow).mockImplementation(async (token, name) => {
            return {
                shows: {
                    items: [
                        fakeShow2,
                        fakeShow3,
                        fakeShow1
                    ]
                }
            }
        })

        const result = await podcastRequestHandler.handleGetPodcast("fake token", "fake name", SortDirection.Descending)

        expect(result).toEqual(expectedResult)
    })

    it("should return a list of shows in original order when passed the None sort direction", async () => {
        const expectedResult = [
            expectedShow2,
            expectedShow3,
            expectedShow1,
        ]

        mocked(spotifyApi.searchShow).mockImplementation(async (token, name) => {
            return {
                shows: {
                    items: [
                        fakeShow2,
                        fakeShow3,
                        fakeShow1
                    ]
                }
            }
        })

        const result = await podcastRequestHandler.handleGetPodcast("fake token", "fake name", SortDirection.None)

        expect(result).toEqual(expectedResult)
    })
})

