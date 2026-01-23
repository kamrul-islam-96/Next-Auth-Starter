import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/dashboard", "/admin"];

export async function proxy(req) {
  const token = await getToken({ req });

  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isUser = token?.role == "user";

  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  // console.log({ isAuthenticated, isUser, reqPath, isPrivate });

  // logic for private route only
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/admin/:path*"],
};
