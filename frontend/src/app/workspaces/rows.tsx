'use client'
import { Workspace } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

export const WorkspaceRow = ({ workspace }: { workspace: Workspace }) => {
    const router = useRouter();
    return (
    <div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
                   space-y-2 sm:space-y-0 sm:space-x-4 hover:bg-gray-100 cursor-pointer 
                   p-4 hover:bg-clip-padding hover:rounded-md mb-4" 
        key={`${workspace._id}-workspace`}
        onClick={() => router.push(`/workspaces/${workspace.slug}`)}
    >
        <div 
            className="text-black w-full sm:w-1/3 font-medium" 
            key={`${workspace._id}-name`}
        >
            {workspace.name}
        </div>
        <div 
            className="text-gray-600 sm:text-black w-full sm:w-1/3 text-left sm:text-center" 
            key={`${workspace._id}-slug`}
        >
            {workspace.slug}
        </div>
        <div 
            className="text-gray-500 sm:text-black w-full sm:w-1/3 text-left sm:text-right text-sm sm:text-base" 
            key={`${workspace._id}-created`}
        >
            {workspace?.createdAt?.toString()}
        </div>
        <div 
            className="h-[1px] w-full sm:h-[3px] sm:w-auto bg-gray-300 hover:bg-blue-500 
                       transition-colors mt-2 sm:mt-0 mix-blend-multiply"
        >
        </div>
    </div>
    );
}