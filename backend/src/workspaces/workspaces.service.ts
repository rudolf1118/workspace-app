import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { Workspace } from "./schemas/workspaces.schema";
import { CreateWorkspaceDto } from './dto/workspaces.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkspacesService {
    constructor(@InjectModel(Workspace.name) private workspaceModel: Model<Workspace>) {
    }

    async createWorkspace (createWorkspaceDto: CreateWorkspaceDto & { userId: string }): Promise<Workspace> {
        const workspace = await this.workspaceModel.findOne({ slug: createWorkspaceDto.slug } );
        if (workspace) {
            throw new ConflictException('Workspace already exists');
        }
        const createdWorkspace = new this.workspaceModel(createWorkspaceDto);
        return createdWorkspace.save();
    }

    async findWorkspace (slug: string): Promise<Workspace> {
        const workspace = await this.workspaceModel.findOne({ slug });
        if (!workspace) {
            throw new NotFoundException("Workspace not found");
        }
        return workspace;
    }

    async getWorkspaceById(id: string): Promise<Workspace> {
        const workspace = await this.workspaceModel.findById(id);
        if (!workspace) {
            throw new NotFoundException("Workspace not found");
        }
        return workspace;
    }

    async getWorkspaces(userId: string): Promise<Workspace[]> {
        const workspaces = await this.workspaceModel.find({ userId });
        if (!workspaces) {
            throw new NotFoundException("Workspaces not found");
        }
        return workspaces;
    }

    async generateSlug(name: string): Promise<string[]> {
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        let index = 1;
        const suggestions:string[] = [];
        while (index < 3) {
            suggestions.push(`${slug}${index}`);
            index++;
        }
        return suggestions;
    }

    async checkSlug(slug: string): Promise<{suggestions: string[], error: string | null}> {
        const workspace = await this.workspaceModel.findOne({ slug });
        if (workspace) {
            const suggestions = await this.generateSlug(slug);
            return {suggestions, error: "Workspace already exists, use one of the following slugs:"};
        }
        return {suggestions: [], error: null};
    }

    async deleteWorkspace(slug: string): Promise<void> {
        const workspace = await this.workspaceModel.findOne({ slug });
        if (!workspace) {
            throw new NotFoundException("Workspace not found");
        }
        await this.workspaceModel.deleteOne({ slug });
    }
}