import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // const locale = req.nextUrl.locale || "es"
  // req.headers["accept-language"]
  const lang =req ? req.headers.get("accept-language"): navigator.language; 
  const lastIndex = lang?.lastIndexOf(',') || 4
  const language =  lang?.substring(1+lastIndex)
  const isAuth = req.cookies.get('_auth')?.value
  console.log(isAuth)
  console.log(req.nextUrl.pathname)
  if (isAuth == undefined){
    return NextResponse.redirect(req.nextUrl.origin+"/auth/login")
  }
  if(req.nextUrl.pathname == "/") {
    return NextResponse.redirect(req.nextUrl.origin+"/dashboard")
  }
  // console.log(cookie) // => 'fast'
  // const allCookies = req.cookies.getAll()
  // console.log(allCookies)
  // const response = NextResponse.next()
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/test',
  // })
  // cookie = response.cookies.get('vercel')
  // console.log(cookie)

  // console.log(language)
  // console.log("running....")
  req.nextUrl.searchParams.set('lang', 'es')
  // req.nextUrl.pathname
  return NextResponse.rewrite(req.nextUrl)
}
export const config = {
  matcher: ['/:path',"/splash/:path*","/dashboard/:path*","/user/:path*"],
}
