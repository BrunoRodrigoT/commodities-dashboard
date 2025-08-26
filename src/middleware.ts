/* eslint-disable @typescript-eslint/no-unused-vars */
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(_req) {
        return NextResponse.next();
    },
    {
        pages: {
            signIn: '/signin',
            error: '/error',
            newUser: '/signin',
            signOut: '/signout',
        },
        callbacks: {
            authorized: ({ token, req }) => {
                const unRequiredPaths = ['/signin', '/error', '/signout'];
                const isLoggedIn = !!token;
                const requiredAuth = !unRequiredPaths.includes(req.nextUrl.pathname);

                return !requiredAuth || (requiredAuth && isLoggedIn);
            },
        },
    }
);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};