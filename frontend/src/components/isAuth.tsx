"use client";

import { isAuthenticated } from "@/utils/Auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const [auth, setAuth] = useState<boolean>(true);

        useEffect(() => {
            const checkAuth = async () => {
                const auth = await isAuthenticated();
                setAuth(auth);
            };
            checkAuth();
        }, []);

        useEffect(() => {
            if (!auth) {
                redirect("/login");
            }
        }, [auth]);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
