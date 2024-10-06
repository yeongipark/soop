import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  // 로그인 안된 상태에서 예약화면에 접근시 로그인 페이지로 리다이렉트
  if (req.nextUrl.pathname.startsWith("/reserve")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  //   로그인한 상태에서 로그인 화면에 접속시 홈화면으로 리다이렉트
  if (req.nextUrl.pathname.startsWith("/login")) {
    console.log("login");
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 토큰이 있다면 요청을 계속 진행
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/reserve", "/login"],
};
