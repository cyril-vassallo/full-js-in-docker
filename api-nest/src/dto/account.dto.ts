
import { IsInt, IsEmail } from 'class-validator';

export class AccountDto {

    @IsEmail()
    email: string;

    @IsInt()
    password: number;

}