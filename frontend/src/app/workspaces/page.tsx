"use client";

import isAuth from "@/components/isAuth";
import { Workspace } from "@/lib/interfaces";
import { useState, useEffect, useMemo, useCallback } from "react";
import { workspaceApi } from "@/lib/api/workspaces";
import { WorkspaceRow } from "./rows";
import { useRouter } from "next/navigation";

const Workspaces = () => {
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const fetchWorkspaces = useCallback(async () => {
        const data = await workspaceApi.getWorkspaces();
        setWorkspaces(data);
    }, []);

    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    const workspaceList = useMemo(() => 
        workspaces.map(workspace => (
            <WorkspaceRow key={`${workspace._id}-workspaceId`} workspace={workspace} />
        ))
    , [workspaces]);

    return (
        <div>
            <div className="flex flex-col justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <input type="text" placeholder="Search" className="w-full p-2 border border-gray-300 rounded-md mr-2" />
                <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
            </div>
            <div className="flex flex-row items-start justify-start w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button className="bg-blue-500 text-white p-2 rounded-md mt-3"
                    onClick={() => router.push("/workspaces/create")}
                >Create Workspace</button>
            </div>
            </div>
            <div className="animate-fadeIn w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                {workspaces.length > 0 ? (
                <div className="flex flex-col p-4 transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-white hover:rounded-md hover:shadow-lg">
                    <div className="hidden sm:flex flex-row mb-4 font-bold animate-slideDown sm:flex-row justify-between items-start sm:items-center p-4">
                        <div className="text-black w-full sm:w-1/3 transition-all duration-200 hover:text-blue-600">Name</div>
                        <div className=" text-black w-1/3 text-center transition-all duration-200 hover:text-blue-600">Slug</div>
                        <div className="text-black w-1/3 text-right transition-all duration-200 hover:text-blue-600">Created At</div>
                    </div>
                    <div className="h-[1px] bg-gray-300 mb-4 animate-expandWidth"></div>
                    <div className="animate-fadeInUp space-y-4">
                        {workspaceList}
                    </div>
                </div>
            ) : (
                <div className="hidden sm:none animate-fadeIn text-gray-500 text-center py-8">No workspaces found</div>
            )}
        </div>
        </div>
    )
}

export default isAuth(Workspaces);