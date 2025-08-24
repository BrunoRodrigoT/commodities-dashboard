import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/signin',
    error: '/error',
    newUser: '/signin',
    signOut: '/signout',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

const auth = NextAuth(authConfig);

export default auth;
