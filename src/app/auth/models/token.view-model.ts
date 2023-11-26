export class TokenViewModel {
    chave: string;
    dataExpiracao: Date;
  
    usuarioToken: UsuarioTokenViewModel;

    constructor(chave: string, data: Date, token: UsuarioTokenViewModel) 
    {
        this.chave = chave;
        this.dataExpiracao = data;
        this.usuarioToken = token;
    }
  }
  
  export class UsuarioTokenViewModel {
    id: string;
    nome: string;
    email: string;

    constructor(nome: string, id: string, e: string)
    {
        this.nome = nome;
        this.email = e;
        this.id = id;
    }
  }
  