"use client";
import { authApi } from "@/lib/api/auth";

export const isAuthenticated = async () => {
    const valid = await authApi.verifyToken();
    return valid;
}