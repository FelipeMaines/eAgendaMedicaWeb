import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuarui.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { TokenViewModel } from "../models/token.view-model";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";

@Injectable()
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public registrarUsuario(registro: RegistrarUsuarioViewModel): Observable<TokenViewModel>{
        return this.http.post(this.apiUrl + 'contas/registrar', registro, this.obterHeader())
        .pipe(map(this.processarDados), catchError(this.processarFalha));

    }

    public autenticarUsuario(usuario: AutenticarUsuarioViewModel): Observable<TokenViewModel>{
        var resultado = this.http.post(this.apiUrl + 'contas/autenticar', usuario, this.obterHeader())
        .pipe(map(this.processarDados), catchError(this.processarFalha));
        debugger;
      return resultado;
    }

    public logout() {
        return this.http.post(this.apiUrl + 'contas/sair', this.obterHeader())
      }
    

    private processarDados(resposta: any) {
        if (resposta.sucesso)
          return resposta.dados;
      }
    
      private processarFalha(resposta: any) {
        return throwError(() => new Error(resposta.error.erros[0]));
      }

    private obterHeader() {
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      }
}