'use client'
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between">
                <h1 className="text-xl font-bold">My App</h1>
    {pathname === "/login" ? (
        <a href="/signup" className="text-blue-500">Sign up</a>
    ) : (
                    <a href="/login" className="text-blue-500">Login</a>
                )}
            </div>
        </nav>
    )
}

export default Navbar;