
import { IsString, MaxLength, IsInt, IsOptional, IsEmail } from 'class-validator';

export class UserDto  {
    @IsInt()
    id: number;

    @IsString()
    @MaxLength(70)
    firstName: string;
    
    @IsString()
    @MaxLength(70)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(255)
    description: string;

    @IsString()
    @MaxLength(70)
    job: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    photo?: string;
}