import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, ) {}

    @HttpCode(HttpStatus.OK)

    @Post('signup')
    signup (@Body() input: any) {
        return this.authService.register(input);
    }

    @Post("login")
    login (@Body() input: any) {
        return this.authService.login(input);
    }
}
