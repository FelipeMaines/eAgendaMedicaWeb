export class RegistrarUsuarioViewModel {
    nome: string;
    login: string;
    email: string;
    senha: string;
    confirmarSenha: string;

    constructor(nome: string, l: string, e: string, s: string, cs: string)
    {
        this.nome = nome;
        this.login = l;
        this.email = e;
        this.senha = s;
        this.confirmarSenha = cs;
    }
  }
  