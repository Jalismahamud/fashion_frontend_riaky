import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const tokenName = process.env.AUTH_TOKEN_NAME || "chique_auth_token";
    const token = request.cookies.get(tokenName)?.value;

    // Public routes (accessible without auth)
    const publicRoutes = [
        "/auth/sign-in",
        "/auth/sign-up",
        "/auth/user-verification",
        "/auth/forgot-password",
        "/auth/create-new-password",
        "/auth/reset-verification",
    ];

    // Protected routes (require login)
    const protectedRoutes = [
        "/dashboard",
        "/quiz",
        "/welcome",
        "/profile-update",
        "/profile-results",
        "/payment", // this covers all /payment subpaths
    ];

    const isPublicPath = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isProtectedPath = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // 🔒 Redirect to login if accessing protected route without token
    if (!token && isProtectedPath) {
        const loginUrl = new URL("/auth/sign-in", request.url);
        loginUrl.searchParams.set("redirect", pathname); // optional: remember where user came from
        return NextResponse.redirect(loginUrl);
    }

    // 🚫 Redirect to dashboard if accessing public route while logged in
    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/:path*",
        "/quiz/:path*",
        "/welcome",
        "/profile-update",
        "/profile-results",
        "/payment/:path*",
    ],
};
