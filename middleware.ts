import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    // جلب الجلسة باستخدام الدالة الرسمية من المكتبة
    const session = getSessionCookie(request);

    // التحقق من وجود الجلسة
    if (!session) {
        // إذا لم تكن هناك جلسة، قم بالتحويل لصفحة تسجيل الدخول
        // مع إضافة رابط الصفحة الحالية ليعود إليها المستخدم بعد التسجيل (اختياري)
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // حماية المسارات المطلوبة
    matcher: ["/blog/:path*", "/create/:path*"],
};
