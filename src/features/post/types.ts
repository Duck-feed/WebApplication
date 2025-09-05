export interface Post {
    id: number,
    author: string,
    avatar: string,
    time: string,
    images:string[],
    content: string,
    likes: number,
    comments: number
}