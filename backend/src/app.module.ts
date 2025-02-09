import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from "./database/database.module";
import {APP_FILTER} from "@nestjs/core";
import configurations from "./configurations";
import {ConfigModule} from "@nestjs/config";
import {TokenModule} from "./auth/token/token.module";
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [configurations]
          }),
    DatabaseModule, AuthModule, UsersModule, TokenModule, WorkspacesModule],
  controllers: [],
  providers:[
  ]
})
export class AppModule {}
