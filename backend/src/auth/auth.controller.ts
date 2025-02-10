import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { JwtAuthGuard } from './guards/auth.guard';
import { InputType, RegisterType } from 'src/common/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, ) {}

    @HttpCode(HttpStatus.OK)

    @Post('signup')
    signup (@Body() input: RegisterType) {
        return this.authService.register(input);
    }

    @Post("login")
    login (@Body() input: InputType) {
        return this.authService.login(input);
    }

    @UseGuards(JwtAuthGuard)
    @Get("verify")
    verifyToken () {
        return {
            statusCode: 200,
            message: "Token is valid"
        }
    }
}