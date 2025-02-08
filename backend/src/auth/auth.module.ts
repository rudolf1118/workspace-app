import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from "@nestjs/config";
import {TokenModule} from "./token/token.module";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
    imports: [
        UsersModule,
        TokenModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
