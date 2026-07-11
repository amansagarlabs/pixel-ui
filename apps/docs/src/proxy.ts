import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_ASSET = /\.(ico|png|jpg|jpeg|gif|svg|webp|txt|xml|css|js|map|woff|woff2)$/
const WAITLIST_PATH = '/waitlist'

function isWaitlistMode() {
  if (process.env.NODE_ENV === 'development') {
    return false
  }

  return process.env.SITE_MODE === 'waitlist' || process.env.NEXT_PUBLIC_SITE_MODE === 'waitlist'
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isWaitlistMode()) {
    return NextResponse.next()
  }

  if (
    pathname === WAITLIST_PATH ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    PUBLIC_ASSET.test(pathname)
  ) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = WAITLIST_PATH
  url.search = ''

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api).*)'],
}
