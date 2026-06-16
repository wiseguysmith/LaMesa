import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))

  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Redirect while preserving any refreshed auth cookies set on supabaseResponse.
  // Without this, the rotated Supabase cookies are dropped on redirect and the
  // next request looks logged-out, causing an infinite redirect loop.
  const redirectTo = (targetPath: string) => {
    url.pathname = targetPath
    const redirectResponse = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie)
    })
    return redirectResponse
  }

  const protectedPaths = ['/dashboard', '/founder', '/builder', '/admin']
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !user) {
    url.searchParams.set('redirect', pathname)
    return redirectTo('/login')
  }

  if (pathname.startsWith('/admin') && user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      url.searchParams.delete('redirect')
      return redirectTo('/dashboard')
    }
  }

  return supabaseResponse
}
