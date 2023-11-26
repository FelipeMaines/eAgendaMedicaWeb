import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ListarCirurgiaViewModel } from "../models/listar-cirurgia.view-model";
import { FormCirurgiaViewModel } from "../models/form-cirurgia.view-model";
import { VisualizarCirurgiaViewModel } from "../models/visualizar-cirurgia.view-model";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";

@Injectable()
export class CirurgiaService{
    apiUrl:string = environment.apiUrl;

    constructor(private http: HttpClient, private localStorageServcie: LocalStorageService){}

    public selecionarTodos(): Observable<ListarCirurgiaViewModel[]>{
        return this.http.get<ListarCirurgiaViewModel[]>(this.apiUrl + 'cirurgia', this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public selecionarPorId(id: string): Observable<VisualizarCirurgiaViewModel>{
        return this.http.get<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public inserir(cir: FormCirurgiaViewModel): Observable<FormCirurgiaViewModel>{
        return this.http.post<FormCirurgiaViewModel>(this.apiUrl + 'cirurgia', cir, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public editar(cir: VisualizarCirurgiaViewModel, id:string): Observable<VisualizarCirurgiaViewModel>{
        return this.http.put<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id, cir, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public excluir(id: string){
        return this.http.delete<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    processarDados(resposta: any) {
        if (resposta.sucesso)
            return resposta.dados;

        else
            return resposta;
    }

    processarFalha(resposta: any) {
        return throwError(() => new Error(resposta.error.erros[0]));
    }

    private obterHeadersAutorizacao() {
        const token = this.localStorageServcie.obterTokenUsuario();

        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        }
      }
}