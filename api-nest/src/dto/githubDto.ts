
import { IsString, IsBoolean } from 'class-validator';

export class GithubDto  {

    @IsString()
    id: string;

    @IsString()
    user: string;
    
    @IsString()
    owner: string;

    @IsString()
    repository: string;

    @IsString()
    branch: string;

    @IsBoolean()
    enabled: boolean; 

    @IsString()
    token: string;

}