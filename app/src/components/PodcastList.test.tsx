import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { PodcastList } from "./PodcastList"
import { Show } from "podcast-list-models"
import React from "react"

describe('PodcastList', () => {
    it('should render 0 list items when no podcasts are passed via props ', () => {
        const podcasts = []

        const { getAllByRole } = render(<PodcastList podcasts={podcasts} />)

        expect(() => getAllByRole("listitem")).toThrowError()        
    })

    it('should render 1 list items when 1 podcast is passed via props ', () => {
        const podcasts: Show[] = [
            {
                id: "podcast 1",
                imageUrl: "fake image 1",
                name: "fake name 1",
                description: "fake description",
                publisher: "fake publisher"
            }
        ]
    
        const { getAllByRole } = render(<PodcastList podcasts={podcasts} />)
    
        const items = getAllByRole("listitem")
    
        expect(items).toHaveLength(1)
    })

    it('should render 1 list items when 1 podcast is passed via props ', () => {
        const podcasts: Show[] = [
            {
                id: "podcast 1",
                imageUrl: "fake image 1",
                name: "fake name 1",
                description: "fake description",
                publisher: "fake publisher"
            },
            {
                id: "podcast 2",
                imageUrl: "fake image 2",
                name: "fake name 2",
                description: "fake description",
                publisher: "fake publisher"
            }
        ]
    
        const { getAllByRole } = render(<PodcastList podcasts={podcasts} />)
    
        const items = getAllByRole("listitem")
    
        expect(items).toHaveLength(2)
    })
})
