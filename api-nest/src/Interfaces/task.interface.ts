export interface TaskInterface {
    id: number;
    userId: number; 
    date: string,
    list: string [],
    commits: Commit[]
}


export interface Commit {
    url: string;
    hash: string;
}