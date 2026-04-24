import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: { headers: request.headers },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll() },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    const pathname = request.nextUrl.pathname;

    const isAuthRoute = pathname.startsWith('/login');
    const isProtectedRoute = pathname.startsWith('/student') || pathname.startsWith('/teacher') || pathname.startsWith('/admin');

    // 2. Basic Auth Checks
    if (!user && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (user && isAuthRoute) {
        return NextResponse.redirect(new URL('/student', request.url))
    }

    // 3. Strict RBAC Logic (Only run if user exists and is on a protected route)
    if (user && isProtectedRoute) {
        // Fetch user profile to check role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const role = profile?.role || 'student';

        // Rule 1: Students cannot access Teacher or Admin routes
        if (role === 'student' && (pathname.startsWith('/teacher') || pathname.startsWith('/admin'))) {
            return NextResponse.redirect(new URL('/student', request.url))
        }

        // Rule 2: Teachers cannot access Admin routes
        if (role === 'teacher' && pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/teacher', request.url))
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}