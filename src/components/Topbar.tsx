"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";

export default function Topbar({ userRole = "admin" }: { userRole?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    // Highlight the active route
    const isActive = (path: string) => pathname.startsWith(path) ? "active" : "";

    // The Logout Execution
    const handleLogout = async () => {
        // 1. Tell Supabase to destroy the session and clear cookies
        await supabase.auth.signOut();

        // 2. Force Next.js to re-evaluate the middleware and redirect to login
        router.refresh();
        router.push("/login");
    };

    return (
        <nav className="topbar flex justify-between items-center px-4">
            <div className="flex h-full items-center">
                <div className="topbar-logo mr-6">🎓 <span>CbKST</span> Dashboard</div>

                <div className="nav-tabs flex h-full">
                    {(userRole === 'student' || userRole === 'admin') && (
                        <Link href="/student" className={`nav-tab ${isActive('/student')}`}>
                            <span className="icon">👤</span><span className="hidden sm:inline">รายบุคคล</span>
                        </Link>
                    )}

                    {(userRole === 'teacher' || userRole === 'admin') && (
                        <Link href="/teacher" className={`nav-tab ${isActive('/teacher')}`}>
                            <span className="icon">👩‍🏫</span><span className="hidden sm:inline">ครู</span>
                        </Link>
                    )}

                    {userRole === 'admin' && (
                        <Link href="/admin" className={`nav-tab ${isActive('/admin')}`}>
                            <span className="icon">🏫</span><span className="hidden sm:inline">ผู้บริหาร</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="topbar-right flex items-center gap-4">
                <div className="live-badge">
                    <div className="live-dot"></div>{userRole.toUpperCase()}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                    title="ออกจากระบบ"
                >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">LOGOUT</span>
                </button>
            </div>
        </nav>
    );
}