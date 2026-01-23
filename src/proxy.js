import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/private", "/dashboard", "/admin"];
const adminRoutes = ["/dashboard"];

export async function proxy(req) {
  const token = await getToken({ req });

  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isUser = token?.role == "user";

  const isAdmin = token?.role == "admin";

  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));

  const isAdminRoute = adminRoutes.some((route) => reqPath.startsWith(route));

  console.log({ isAuthenticated, isUser, reqPath, isPrivate });

  // logic for private route only
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  // logic for admin routes
  if (isAuthenticated && !isAdmin && isAdminRoute) {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/admin/:path*"],
};



// 60820816040-ep47gj5fkusjpkemm0ttsapb940eo3tl.apps.googleusercontent.com
// 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