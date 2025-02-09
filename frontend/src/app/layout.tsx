import "./globals.css";
import Navbar from "@/components/Navbar";
    
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
        <footer className="p-4 bg-white shadow-md text-center">
          © {new Date().getFullYear()} Workspace
            </footer>
        </body>
        </html>
    );
}
