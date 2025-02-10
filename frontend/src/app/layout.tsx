import "./globals.css";
import Navbar from "@/components/Navbar";
import React from "react";
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-100 text-gray-900">
            <React.Suspense fallback={
                <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            }>
                <Navbar />
                <main className="p-6 max-w-6xl mx-auto">
                    {children}
                </main>
                <footer className="p-4 bg-white shadow-md text-center">
                    © {new Date().getFullYear()} Workspace
                </footer>
            </React.Suspense>
            </body>
        </html>
    );
}
