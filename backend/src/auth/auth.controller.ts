import {Body, Controller, Get, Header, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import { JwtAuthGuard } from './guards/auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get("verify")
    @Header("Authorization", "Bearer")
    verifyToken () {
        return {
            message: "Token is valid"
        }
    }
}
