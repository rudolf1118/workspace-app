import { Workspace, IWorkspaceAPI } from "../interfaces";
import { AxiosConfig } from "./axiosConfig";

class WorkspaceAPI extends AxiosConfig implements IWorkspaceAPI {

    constructor() {
        super("workspaces");
    }

    async getWorkspaces(): Promise<Workspace[]> {
        try {
            const res = await this.w_auth?.get(`/`);
            if (!res || !res.data) throw new Error("Failed to get workspaces");
            return res.data;
        } catch (error) {
            throw new Error("Failed to get workspaces");
        }
    }

    async createWorkspace(workspace: Workspace): Promise<Workspace> {
        try {
            const res = await this.w_auth?.post(`/create`, workspace);
            if (!res || !res.data) throw new Error("Failed to create workspace");
            return res.data;
        } catch (error) {
            throw new Error("Failed to create workspace");
        }
    }

    async getWorkspaceBySlug(slug: string): Promise<Workspace> {
        try {
            const res = await this.w_auth?.get(`/${slug}`);
            if (!res || !res.data) throw new Error("Failed to get workspace by slug");
            return res.data;
        } catch (error) {
            throw new Error("Failed to get workspace by slug");
        }
    }
    
    async checkSlug(slug: string): Promise<{suggestions: string[], error: string | null}> {
        try {
            const res = await this.w_auth?.get(`/check-slug/${slug}`);
            if (!res || !res.data) throw new Error("Failed to check slug");
            return res.data;
        } catch (error) {
            throw new Error("Failed to check slug");
        }
    }

    async deleteWorkspace(slug: string): Promise<void> {
        try {
            await this.w_auth?.delete(`/${slug}`);
        } catch (error) {
            throw new Error("Failed to delete workspace");
        }
    }
}

export const workspaceApi = new WorkspaceAPI();
