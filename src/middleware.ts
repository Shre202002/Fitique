// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import jwt from "jsonwebtoken";

// // export function middleware(req: NextRequest) {
// //   const token = req.cookies.get("token")?.value;
// //   const { pathname } = req.nextUrl;

// //   // Public routes that don't require auth
// //   const publicRoutes = [
// //     "/",
// //     "/login",
// //     "/register",
// //     "/api/auth/login",
// //     "/api/auth/register",
// //   ];

// //   // Allow public paths, static assets, and open APIs
// //   if (
// //     publicRoutes.includes(pathname) ||
// //     pathname.startsWith("/_next") ||
// //     pathname.startsWith("/images") ||
// //     pathname.startsWith("/favicon") ||
// //     pathname.startsWith("/api/public") ||
// //     // allow auth API endpoints (send-otp / verify-otp etc.) through without auth
// //     pathname.startsWith("/api/auth")
// //   ) {
// //     return NextResponse.next();
// //   }

// //   // If user is not logged in, redirect to login
// //   if (!token) {
// //     const loginUrl = req.nextUrl.clone();
// //     loginUrl.pathname = "/login";
// //     console.log(loginUrl);
// //     loginUrl.searchParams.set("redirect", pathname);
// //     console.log(loginUrl);

// //     return NextResponse.redirect(loginUrl.href);
// //   }

// //   try {
// //     jwt.verify(token, process.env.JWT_SECRET!);
// //     return NextResponse.next();
// //   } catch (error) {
// //     console.error("JWT verification failed:", error);
// //     const loginUrl = req.nextUrl.clone();
// //     // console.log(loginUrl);

// //     loginUrl.pathname = "/login";
// //     loginUrl.searchParams.set("redirect", pathname);
// //     return NextResponse.redirect(loginUrl);
// //   }
// // }

// // export const config = {
// //   matcher: [
// //     "/((?!_next/static|_next/image|favicon.ico|images|api/public).*)",
// //   ],
// // };



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   // Public routes that don't require login
//   const publicRoutes = [
//     "/",
//     "/login",
//     "/register",
//     "/api/auth/login",
//     "/api/auth/register",
//   ];

//   // Allow public routes, static assets, images, favicon, and open APIs
//   if (
//     publicRoutes.includes(pathname) ||
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/images") ||
//     pathname.startsWith("/favicon") ||
//     pathname.startsWith("/api/public") ||
//     pathname.startsWith("/api/auth") // allow all auth endpoints
//   ) {
//     return NextResponse.next();
//   }

//   // No token → redirect to login with redirect param
//   if (!token) {
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Verify token validity
//   try {
//     jwt.verify(token, process.env.JWT_SECRET!);
//     return NextResponse.next();
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     const loginUrl = new URL("/login", req.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }
// }

// // Middleware applies to everything except static files and open APIs
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/public).*)"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Temporarily disable auth checks for MVP demo
export function middleware(req: NextRequest) {
  // Allow all routes
  return NextResponse.next();
}

// Keep matcher in case you re-enable later
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api/public).*)",
  ],
};


