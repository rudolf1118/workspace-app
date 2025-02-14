import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";
import { User } from '../users/schemas/users.schema'
import { TokenService } from "./token/token.service"
import { TokenResponse } from 'src/common/interfaces';
import { InputType, RegisterType } from 'src/common/types';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService) {}

    async generateToken (user: User): Promise<TokenResponse> {
        const payload = { sub: user._id, password: user.password, role: user.role, email: user.email};
        const generated = await this.tokenService.generateJwtToken(payload);

        if (!generated) {
            throw new BadRequestException();
        }

        return {
            user_id: user._id as string,
            access_token: generated,
        }
    }

    async register(candidate: RegisterType): Promise<TokenResponse> {
        const { password, ...rest} = candidate;
        if (!password) {
            throw new BadRequestException();
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCreating = await this.usersService.createUser({ ...rest, password: hashedPassword });
        return this.generateToken(userCreating);
    }

    async login (input:InputType): Promise<TokenResponse> {
        const user = await this.usersService.findUser(input?.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const validPass = await bcrypt.compare(input.password, user.password);
        if(!validPass) {
            throw new UnauthorizedException("Password is not valid, try again.");
        }
        return this.generateToken(user);
    }
}