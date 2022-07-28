export interface TaskInterface {
    date: string,
    list: string [],
    commits: Commit[]
}


export interface Commit {
    url: string;
    hash: string;
}