
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { TaskInterface, CommitInterface } from '../Interfaces/interfaces';

export class TaskDto  {
    @IsInt()
    id: number;

    @IsInt()
    userId: number;
    
    @IsString()
    @MaxLength(8)
    date: string;

    list: string[];
    
    commits: CommitInterface[];

}