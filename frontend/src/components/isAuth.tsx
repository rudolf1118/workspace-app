"use client";

import { isAuthenticated } from "@/utils/Auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const [auth, setAuth] = useState<boolean>(true);

        useEffect(() => {
            const checkAuth = async () => {
                const valid = await isAuthenticated().then((res) => {
                    setAuth(res);
                });
            };
            checkAuth();
        }, []);

        useEffect(() => {
            if (!auth) {
                return redirect("/");
            }
        }, [auth]);

        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}
