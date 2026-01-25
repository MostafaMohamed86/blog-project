import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        // استخدام request.nextUrl يضمن أن التحويل يتم بشكل صحيح في الـ Production
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // إضافة :path* تضمن حماية /blog وأي صفحة داخلها مثل /blog/123
    matcher: ["/blog/:path*", "/create/:path*"], 
};
