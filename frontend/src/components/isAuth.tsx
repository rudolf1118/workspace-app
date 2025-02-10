"use client";

import { isAuthenticated } from "@/utils/Auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: React.ComponentType<any>) {
    return function IsAuth(props: any) {
        const [auth, setAuth] = useState<boolean>(false);
        const [loading, setLoading] = useState<boolean>(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const authStatus = await isAuthenticated();
                    setAuth(authStatus);
                } catch (error) {
                    setAuth(false);
                } finally {
                    setLoading(false);
                }
            };
            
            checkAuth();
        }, []);

        useEffect(() => {
            if (!loading && !auth) {
                redirect("/login");
            }
        }, [auth, loading]);

        if (loading) {
            return  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
