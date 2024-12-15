import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";

const authRoutes = ["/login", "/register","/reset-password","/forgot=password"];


type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
    ADMIN: [/^\/admin/, ],
    VENDOR: [/^\/vendor/, ],
    CUSTOMER: [/^\/customer/, /^\/cart/, /^\/checkout/],
};


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    
    const user = await getCurrentUser();

    // If the user is not authenticated
    if (!user) {
   
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
           
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url)
            );
        }
    }

    // Role-Based Authorization
    if (user?.role && roleBasedRoutes[user.role as Role]) {
        const allowedRoutes = roleBasedRoutes[user.role as Role];

        
        if (allowedRoutes.some((route) => route.test(pathname))) {
            return NextResponse.next(); // Allow access
        }
    }

   
    return NextResponse.redirect(new URL("/", request.url));
}


export const config = {
    matcher: [
        "/login",
        "/register",
        "/profile/:path*",   
        "/admin/:path*",
        "/vendor/:path*",
        "/customer/:path*",
        "/cart",     
        "/checkout",     
    ],
};