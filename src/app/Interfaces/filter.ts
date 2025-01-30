export interface Filter {
    title?: string | null,
    authorId?: number | null,
    abstract_?: string | null,
    keywords?: string | null,
    revue?: string | null,
    researchField?: string | null,
    AscDate?: boolean | null,
    DescDate?: boolean | null,
    DOI?: string | null,
    limit?: number | null
}
