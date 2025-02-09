'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => router.push('/workspaces')}>Workspace</h1>
                {pathname === "/login" ? (
                    <a href="/signup" className="text-blue-500">Sign up</a>
                ) : (pathname === "/signup" || pathname === "/" ? (
                    <a href="/login" className="text-blue-500">Login</a>
                ) : (
                    <a href="/" className="text-blue-500"
                        onClick={() => {
                            localStorage.removeItem('token');
                            router.push('/');
                        }}
                    >Logout</a>
                ))}
            </div>
        </nav>
    )
}

export default Navbar;