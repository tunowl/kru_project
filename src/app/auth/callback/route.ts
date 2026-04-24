import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/student'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Login successful, DB accepted the email
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            // The DB trigger rejected the email, causing exchangeCodeForSession to fail
            console.error("Auth Callback Error:", error.message);
            return NextResponse.redirect(`${origin}/login?error=Unauthorized`)
        }
    }

    // Fallback for missing code
    return NextResponse.redirect(`${origin}/login?error=InvalidCode`)
}