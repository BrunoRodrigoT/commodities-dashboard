interface IUser {
    image: string | Blob | undefined;
    id: string;
    name: string;
    email: string;
    active: boolean;
    token: string;
}

interface IAuthLogin {
    token: string;
    user: IUser;
}

interface ISignInCredentials {
    email: string;
    password: string;
}

export type { IUser, IAuthLogin, ISignInCredentials };