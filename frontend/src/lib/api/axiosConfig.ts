import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IAxiosConfig } from "../interfaces";

export class AxiosConfig implements IAxiosConfig {

    public w_auth: AxiosInstance | null = null;
    public wo_auth: AxiosInstance | null = null;
    public baseURL: string = "";
    
    public updateToken() {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        return token;
    }

    public init(options?: AxiosRequestConfig) {
        const token = this.updateToken();
        if (!token) {
            this.w_auth = null;
        } else {
            this.w_auth = axios.create({
                baseURL: this.baseURL,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                ...options,
            });
        }
    }

    constructor(endpoint?: string, options?: AxiosRequestConfig) {
        this.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api${endpoint ? `/${endpoint}` : ""}`;
        this.init(options);
        this.wo_auth = axios.create({
            baseURL: this.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        });
    }
}
