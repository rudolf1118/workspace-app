import { IsNotEmpty, IsString, IsEmail, MinLength, Matches, IsNumber, Min } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}