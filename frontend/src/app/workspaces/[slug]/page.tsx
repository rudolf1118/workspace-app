"use client"

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { workspaceApi } from '@/lib/api/workspaces';
import { Workspace } from '@/lib/interfaces';
import isAuth from "@/components/isAuth";

const WorkspaceDetail = () => {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;

    const [workspace, setWorkspace] = useState<Workspace | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            const fetchWorkspace = async () => {
                try {
                    const data = await workspaceApi.getWorkspaceBySlug(slug as string);
                    if(!data) setError("Workspace not found");
                    setWorkspace(data);
                } catch (error) {
                    setError("Failed to fetch workspace");
                    console.error('Failed to fetch workspace:', error);
                }
            };
            fetchWorkspace();
        }
    }, [slug]);

    if (!workspace) {
        return <div className="flex flex-col justify-center items-center font-bold text-xl">{error ? error : "Loading..."}</div>;
    }

    const deleteWorkspace = async () => {
        try {
            setIsLoading(true);
            await workspaceApi.deleteWorkspace(workspace.slug);
            router.push('/workspaces');
        } catch (error) {
            console.error('Failed to delete workspace:', error);
            setError('Failed to delete workspace');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        value={workspace.name}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                        Slug
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="slug"
                        type="text"
                        value={workspace.slug}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdAt">
                        Created At
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="createdAt"
                        type="text"
                        value={workspace.createdAt?.toString()}
                        disabled
                    />
                </div>
                <button 
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded-md mt-3"
                    onClick={deleteWorkspace}
                >Delete Workspace</button>
            </form>
        </div>
    );
};

export default isAuth(WorkspaceDetail);