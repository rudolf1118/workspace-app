import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IAxiosConfig } from "../interfaces";

export class AxiosConfig implements IAxiosConfig {

    public w_auth: AxiosInstance | null = null;
    public wo_auth: AxiosInstance | null = null;

    constructor(options?: AxiosRequestConfig) {
        const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
        if(token) {
            this.w_auth = axios.create({
                baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                ...options,
            });
        }
        this.wo_auth = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        });
    }
}