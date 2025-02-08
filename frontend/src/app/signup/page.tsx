"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { SignupParams } from "@/lib/interfaces";

export default function SignupPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<SignupParams>();

    async function onSubmit(data: SignupParams) {
        const res = await authApi.signup(data);
        if (res.access_token) router.push("/login");
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Surname"
                            {...register("surname", { required: "Surname is required" })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message?.toString()}</p>}
                    </div>

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
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" }
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
                    </div>

                    <div className="space-y-2">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", { 
                                required: "Please confirm your password",
                                validate: (val: string | undefined, formValues: SignupParams) => 
                                    val === formValues.password || "Passwords do not match"
                            })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message?.toString()}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
