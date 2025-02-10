import {Controller, Get, Post, Req, UseGuards, Body} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }
    @UseGuards(JwtAuthGuard)
    @Get("getMe")
    async me(@Req() request) {
        return this.userService.findUser(request.user.email);
    }

    @Post("verify-email")
    verifyEmail (@Body() input: string) {
        return this.userService.verifyEmail(input);
    }
}
