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

    getGithubByUserId(userId: number): GithubInterface {
        return this.githubFromDb
        .filter((github) => { 
            return userId == github.userId;
           })[0]; 
    
    }

    updateGithubRepository(githubDto: GithubDto): GithubInterface {
        let github: GithubInterface | undefined = this.getGithubByUserId(githubDto.userId);
        console.log(github)
        if(github !== undefined) {
            //update
            github.owner = githubDto.owner;
            github.repository = githubDto.repository;
            github.branch = githubDto.branch;
            github.enabled = githubDto.enabled;
        }else {
            //create
            const lastGithub: GithubInterface = this.githubFromDb.reduce( (previewGit: GithubInterface, currentGit: GithubInterface) => {
                return previewGit.id < currentGit.id ? currentGit : previewGit;
            }) 
            githubDto.id = lastGithub.id + 1 
            this.githubFromDb.push(githubDto);
            github = this.githubFromDb[this.githubFromDb.length - 1];
        }
        console.log(this.githubFromDb);
        return github;

    }

    
}