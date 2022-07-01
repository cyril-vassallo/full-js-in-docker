import config from '../../config'

type Home = (id: number) => object

export const home: Home = function (id: number) {
    return {
        title: "homepage",
        authors: config.endpoint + "/authors",
        author: config.endpoint + "/authors/" + id
    }
}