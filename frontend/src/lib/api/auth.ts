import { SignupParams, LoginParams, AuthResponse, IAuthApi } from "../interfaces";
import { AxiosConfig } from "./axiosConfig";

class AuthApi extends AxiosConfig implements IAuthApi {

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
                return res.data;
            }
            throw new Error("Failed to login");
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
            if (res.data.message === "Token is valid") {
                return true;
            }
            return false;
        } catch(e) {
            return false;
        }
    }
}

export const authApi = new AuthApi();