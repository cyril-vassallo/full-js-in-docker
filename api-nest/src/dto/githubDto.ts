
import { IsString,  IsInt, IsBoolean } from 'class-validator';

export class GithubDto  {
    @IsInt()
    id: number;

    @IsInt()
    userId: number;
    
    @IsString()
    owner: string;

    @IsString()
    repository: string;

    @IsString()
    branch: string;

    @IsBoolean()
    enabled: string; 



}