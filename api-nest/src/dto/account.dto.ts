
import { IsEmail, IsString } from 'class-validator';

export class AccountDto {

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;

}