
import { IsString,  IsInt, IsBoolean, IsOptional } from 'class-validator';

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
    enabled: boolean; 



}