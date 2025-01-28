export interface PaperMetaData {
    paperDTO: {
        title: string;
        authorId: number;
        field: string;
        publishedIn: string;
        publicationDate: string;
        keywords: string;
        abstract_: string;
        DOI: string;
        likes: number;
        dislikes: number;
        comments: string[];
    },
    userInfoDTO: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }
}
