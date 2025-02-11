"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authApi } from "../../lib/api/auth";
import { LoginParams } from "../../lib/interfaces";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginParams>();
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(data: LoginParams) {
        let res;
        try {
            res = await authApi.login(data);
        } catch (error) {
            console.error("Login failed:", error);
            setError("Password or email is incorrect");
        }
        if (res?.access_token) router.push("/");
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
