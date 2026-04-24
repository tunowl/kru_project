import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/student'

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const email = data.user?.email || "";
            const isAdmin = email === "tunowl2head@gmail.com";
            const isTeacher = email.endsWith("@nssc.ac.th");
            const isStudent = email.endsWith("@student.nssc.ac.th");

            if (!isAdmin && !isTeacher && !isStudent) {
                await supabase.auth.signOut();
                return NextResponse.redirect(`${origin}/login?error=Unauthorized`);
            }

            let defaultNext = '/student';
            if (isAdmin) defaultNext = '/admin';
            else if (isTeacher) defaultNext = '/teacher';

            return NextResponse.redirect(`${origin}${searchParams.get('next') || defaultNext}`);
        } else {
            // Some other error occurred during exchange
            console.error("Auth Callback Error:", error.message);
            return NextResponse.redirect(`${origin}/login?error=Unauthorized`)
        }
    }

    // Fallback for missing code
    return NextResponse.redirect(`${origin}/login?error=InvalidCode`)
}