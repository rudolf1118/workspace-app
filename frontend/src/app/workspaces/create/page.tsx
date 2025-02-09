"use client"

import { workspaceApi } from "@/lib/api/workspaces";
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from "react";
import isAuth from "@/components/isAuth";
import { useRouter } from "next/navigation";

const CreateWorkspace = () => {
    const [workspaceSlug, setWorkspaceSlug] = useState("");
    const [debouncedWorkspaceSlug] = useDebounce(workspaceSlug, 500);
    const [error, setError] = useState<{suggestions: string[], error: string | null} | null>(null);
    const [workspaceName, setWorkspaceName] = useState("");
    const router = useRouter();
    useEffect(() => {
        async function checkSlug() {
            if (!debouncedWorkspaceSlug) return;
            
            try {
                const res = await workspaceApi.checkSlug(debouncedWorkspaceSlug);
                setError({suggestions: res.suggestions, error: res.error});
            } catch (err) {
                console.error(err);
                setError({suggestions: [], error: "Error checking slug"});
            }
        }
        checkSlug();
    }, [debouncedWorkspaceSlug]);

    const handleSubmit = async () => {
        
        if (!workspaceName || !workspaceSlug) {
            setError({suggestions: [], error: "Please fill in all fields"});
            return;
        }

        try {
            const res = await workspaceApi.createWorkspace({
                name: workspaceName,
                slug: workspaceSlug,
            });
            if (res) {
                router.push(`/workspaces/${res.slug}`);
            }
        } catch (err) {
            console.error(err);
            setError({suggestions: [], error: "Error creating workspace"});
        }
    }
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Workspace</h1>
                <form  className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            onChange={(e) => {
                                setWorkspaceName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="space-y-2 flex flex-col justify-start items-start">
                        <input
                            type="text"
                            placeholder="Slug"
                            onChange={(e) => {
                                setWorkspaceSlug(e.target.value);
                            }}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                        />
                        {error && 
                            <div className="text-gray-500 text-sm font-medium">
                                <div className="text-red-500">{error.error}</div> 
                                {error.suggestions.map((suggestion, index) => (
                                    <div key={index} className="text-gray-500">{suggestion}</div>
                                ))}
                            </div>
                        }
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={error?.error !== null && error?.error !== undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        Create Workspace
                    </button>
                </form>
            </div>
        </div>
    )
}

export default isAuth(CreateWorkspace);