import { Injectable } from "@angular/core";
import { TokenViewModel, UsuarioTokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService {

    public salvarDadosLocaisUsuario(resposta: TokenViewModel): void {
        debugger;
        this.salvarTokenUsuario(resposta.chave);
        this.salvarDataExpiracaoToken(resposta.dataExpiracao);
        this.salvarUsuario(resposta.usuario);
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('eAgendaMedica.token', token);
    }

    public salvarUsuario(usuario: UsuarioTokenViewModel) {
        const jsonString = JSON.stringify(usuario);

        localStorage.setItem('eAgendaMedica.usuario', jsonString);
    }

    public salvarDataExpiracaoToken(data: Date) {
        const strString: string = data.toString();

        localStorage.setItem('eAgendaMedica.dataExpiracaoToken', strString);
    }

    public obterUsuarioSalvo() {
        const usuarioJson = localStorage.getItem('eAgendaMedica.usuario');

        if (usuarioJson)
            return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

        return null;
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('eAgendaMedica.token') ?? '';
    }

    public obterDataExpiracaoToken(): Date | null {
        const dataExpiracaoJson = localStorage.getItem('eAgenda.dataExpiracaoToken');

        if (dataExpiracaoJson)
            return new Date(dataExpiracaoJson);

        return null;
    }

    public limparDadosLocais() {
        localStorage.removeItem('eAgenda.token');
        localStorage.removeItem('eAgenda.dataExpiracaoToken');
        localStorage.removeItem('eAgenda.usuario');
    }
}