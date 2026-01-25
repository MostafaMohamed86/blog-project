import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // جلب كل الكوكيز
    const cookies = request.cookies.getAll();
    
    // البحث عن أي كوكي يخص الجلسة
    // Better Auth يستخدم أسماء تحتوي على session_token
    const hasSession = cookies.some(c => c.name.includes("session_token"));

    // إذا لم يجد الجلسة، يحول للوجين
    if (!hasSession) {
        const loginUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/blog/:path*", "/create/:path*"],
};
