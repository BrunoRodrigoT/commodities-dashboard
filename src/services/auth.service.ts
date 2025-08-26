import { signOut as NextAuthSignout } from 'next-auth/react';

export default class AuthService {

    static async signOut() {
        return await NextAuthSignout({ callbackUrl: '/signin', redirect: true });
    }
}