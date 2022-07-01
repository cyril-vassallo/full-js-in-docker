type GetAuthors  = () => object
export const getAuthors: GetAuthors = function () {
    return { "authors": "list of authors" }
}

type GetAuthor  = (id: number) => object
export const getAuthor: GetAuthor = function (id: number){
    return {
        "author": `author with id: ${id} was fetch, you can change the id in the url, all values accepted`,
    }
}