export class AutenticarUsuarioViewModel {
    login: string;
    senha: string;

    constructor(l: string, s: string)
    {
        this.login = l;
        this.senha = s;
    }
}