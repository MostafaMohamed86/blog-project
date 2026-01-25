import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/lib/auth-client"; 

export async function middleware(request: NextRequest) {
    // جلب الجلسة من الكوكيز
    const sessionCookie = request.cookies.get("better-auth.session_token") || 
                          request.cookies.get("__secure-better-auth.session_token");

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/blog/:path*", "/create/:path*"],
};
