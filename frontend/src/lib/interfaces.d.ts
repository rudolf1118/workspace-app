export interface SignupParams {
    email: string;
    password: string;
    name: string;
    surname: string;
    confirmPassword?: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface WorkspaceParams {
    name: string;
    slug: string;
}

export interface AuthResponse {
    access_token: string;
    user_id: string;
}

export interface IAuthApi {
    signup(params: SignupParams): Promise<AuthResponse>;
    login(params: LoginParams): Promise<AuthResponse>;
}

export interface IAxiosConfig {
    w_auth: AxiosInstance | null;
    wo_auth: AxiosInstance | null;
    baseURL: string;
}

export interface IWorkspaceAPI {
    getWorkspaces(): Promise<Workspace[]>;
    createWorkspace(workspace: Workspace): Promise<Workspace>;
    getWorkspaceBySlug(slug: string): Promise<Workspace>;
}

export interface Workspace {
    _id?: string;
    id?: string;
    name: string;
    slug: string;
    userId?: string;
    createdAt?: Date;
}