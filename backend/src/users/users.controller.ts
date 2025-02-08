import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import {UsersService} from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }
    @Get("getMe")
    async me(@Req() request) {
        return this.userService.findUser(request.user.email);
    }
}
