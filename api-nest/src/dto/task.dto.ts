
import { IsString, MaxLength } from 'class-validator';
import { CommitInterface } from '../Interfaces/interfaces';

export class TaskDto  {
    @IsString()
    id: string;

    @IsString()
    user: string;
    
    @IsString()
    @MaxLength(8)
    date: string;

    list: string[];
    
    commits: CommitInterface[];

}