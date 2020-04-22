export enum SortDirection {
    None = "none",
    Ascending = "ascending",
    Descending = "descending"
}

export interface Show {
    id: string,
    description: string,
    name: string,
    publisher: string
    imageUrl: string
}
