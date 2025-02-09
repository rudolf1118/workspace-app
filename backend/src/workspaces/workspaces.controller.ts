import {Controller, Get, Param, Post, UseGuards, Body, UsePipes, ValidationPipe, Req, Delete} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/auth.guard";
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/workspaces.dto';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspacesController {
    constructor(private readonly workspaceService: WorkspacesService, private readonly authService: AuthService) {
    }
    @Get(":slug")
    async getWorkspace(@Param("slug") slug: string) {
        return this.workspaceService.findWorkspace(slug);
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() request) {
        return this.workspaceService.createWorkspace({ ...createWorkspaceDto, userId: request.user.sub } );
    }

    @Get("") 
    async getWorkspaces(@Req() request) {
        return this.workspaceService.getWorkspaces(request.user.sub);
    }

    @Get("check-slug/:slug")
    async checkSlug(@Param("slug") slug: string) {
        return this.workspaceService.checkSlug(slug);
    }

    @Delete(":slug")
    async deleteWorkspace(@Param("slug") slug: string) {
        return this.workspaceService.deleteWorkspace(slug);
    }
}