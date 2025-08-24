/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import { DefaultJWT, JWT } from 'next-auth/jwt';
import { IAuthLogin, IUser } from '../Auth';

declare module 'next-auth' {
  interface Session {
    user: IUser;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user?: IAuthLogin;
  }
}
