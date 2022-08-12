import { GithubInterface } from "src/Interfaces/interfaces";
import { GithubDto } from '../dto/githubDto';

export class GithubService {
    constructor() {}

    private githubFromDb: GithubInterface[] = [
        {
            id: 1,
            userId: 4,
            owner: 'cyril-vassallo',
            repository: "full-js-in-docker",
            branch: "ANGULAR-14_NEST-JS",
            enabled: true
        },
        {
            id: 2,
            userId: 2,
            owner: 'cyril-vassallo',
            repository: "full-js-in-docker",
            branch: "ANGULAR-14_NEST-JS",
            enabled: false
        }
    ]

    getGithubByUserId(id: number): GithubInterface {
        return this.githubFromDb
        .filter((github) => { 
            return id == github.userId;
           })[0]; 
    
    }

    
}