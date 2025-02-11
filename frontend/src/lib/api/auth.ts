import { SignupParams, LoginParams, AuthResponse, IAuthApi } from "../interfaces";
import { AxiosConfig } from "./axiosConfig";

export class AuthApi extends AxiosConfig implements IAuthApi {

    constructor() {
        super();
    }

    async signup(params: SignupParams): Promise<AuthResponse> {
        try {
            const res = await this.wo_auth?.post("/auth/signup", params);
            if (!res || !res.data) throw new Error("Failed to signup");
            return res?.data;
        } catch(e) {
            throw e;
        }
    }

    async login(params: LoginParams): Promise<AuthResponse> {
        try {
            const res = await this.wo_auth?.post("/auth/login", params);
            if (!res || !res.data) throw new Error("Failed to login");
            if (res.data.access_token) {
                localStorage.setItem("token", res.data.access_token);
                this.init();
                return res.data;
            }
            throw new Error("Password or email is incorrect");
        } catch(e) {
            throw e;
        }
    }

    async verifyToken(): Promise<boolean> {
        try {
            const token = localStorage.getItem("token");
            if (!token) return false;    
            const res = await this.w_auth?.get("/auth/verify");
            if (!res || !res.data) throw new Error("Failed to verify token");

            if(res.data.statusCode === 200) return true;
            return false;
        } catch(e) {
            return false;
        }
    }

    async verifyEmail(email: string): Promise<{status: boolean, message: string}> {
        try {
            const res = await this.wo_auth?.post("/users/verify-email", {email});
            if (!res || !res.data) throw new Error("Failed to verify email");
            if (res.data.statusCode === 400) {
                return {
                    status: false,
                    message: res.data.message
                }
            }
            return {
                status: true,
                message: res.data.message
            }
        } catch(e) {
            throw e;
        }
    }
}

export const authApi = new AuthApi();