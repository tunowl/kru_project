import Topbar from "@/components/Topbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    // 1. Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Security fallback
    if (!user) {
        redirect("/login");
    }

    // 3. Fetch their role from the profiles table
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    const userRole = profile?.role || "student"; // Default fallback

    return (
        <div className="min-h-screen bg-[var(--bg)] font-sarabun text-[var(--text)]">
            {/* Pass the real role to the Topbar */}
            <Topbar userRole={userRole} />

            <main className="pt-[72px] pb-10">
                {children}
            </main>
        </div>
    );
}