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
            token: "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",
            enabled: true
        },
        {
            id: 2,
            userId: 2,
            owner: 'cyril-vassallo',
            repository: "full-js-in-docker",
            branch: "ANGULAR-14_NEST-JS",
            token: "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",
            enabled: false
        }
    ]

    getGithubByUserId(userId: number): GithubInterface {
        return this.githubFromDb
        .filter((github) => { 
            return userId == github.userId;
           })[0]; 
    
    }

    updateGithubRepository(githubDto: GithubDto): GithubInterface {
        let github: GithubInterface | undefined = this.getGithubByUserId(githubDto.userId);
        if(github !== undefined) {
            //update
            github.owner = githubDto.owner;
            github.repository = githubDto.repository;
            github.branch = githubDto.branch;
            github.enabled = githubDto.enabled;
            github.token = githubDto.token;
        }else {
            //create
            const lastGithub: GithubInterface = this.githubFromDb.reduce( (previewGit: GithubInterface, currentGit: GithubInterface) => {
                return previewGit.id < currentGit.id ? currentGit : previewGit;
            }) 
            githubDto.id = lastGithub.id + 1 
            this.githubFromDb.push(githubDto);
            github = this.githubFromDb[this.githubFromDb.length - 1];
        }
        return github;

    }

    
}