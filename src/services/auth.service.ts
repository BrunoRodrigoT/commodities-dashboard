import { IAuthLogin, ISignInCredentials, IUser } from "@/@types/Auth";
import api from "@/config/api";
import handleAxiosError from "@/helpers/handleAxiosError";
import { signIn as NextAuthSignIn, signOut as NextAuthSignout } from 'next-auth/react';


export default class AuthService {

    static async signIn(data: ISignInCredentials): Promise<IAuthLogin | { message: string }> {
        const response = await NextAuthSignIn('credentials', {
            ...data,
            redirect: false,
        });
        if (response?.error) {
            throw new Error('Email ou senha incorretos.');
        }
        return {
            message: 'Autenticação realizada com sucesso.',
        };
    }

    static async signOut() {
        return await NextAuthSignout({ callbackUrl: '/signin', redirect: true });
    }

    static async signUp(credentials: Partial<IUser>): Promise<IUser> {
        try {
            const response = await api.post(`/register`, credentials);
            return response.data.data;
        } catch (error) {
            handleAxiosError(error);
        }
    }
}