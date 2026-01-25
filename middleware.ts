// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   // البحث عن الكوكي بالاسم الدقيق الذي وجدناه في متصفحك
//   const sessionToken =
//     request.cookies.get("__Secure-better-auth.session_token") ||
//     request.cookies.get("better-auth.session_token");

//   // التحقق من وجود الكوكي وقيمته
//   if (!sessionToken || !sessionToken.value) {
//     // إذا لم يجد الجلسة، يحول لصفحة تسجيل الدخول
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // إذا وجد الجلسة، يسمح بالمرور
//   return NextResponse.next();
// }

// export const config = {
//   // حماية المسارات المطلوبة وكل ما بداخلها
//   matcher: ["/blog/:path*", "/create/:path*"],
// };
