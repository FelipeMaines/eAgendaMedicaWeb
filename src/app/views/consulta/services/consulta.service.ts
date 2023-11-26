import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ListarConsultaViewModel } from "../models/listar-consulta.view-model";
import { VisualizarConsultaViewModel } from "../models/visualizar-consulta.view-model";
import { FormConsultaViewModel } from "../models/form-consulta.view-model";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";

@Injectable()
export class ConsultaService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private localStorageServcie: LocalStorageService) { }

    public selecionarTodos(): Observable<ListarConsultaViewModel[]> {
        return this.http.get<ListarConsultaViewModel[]>(this.apiUrl + 'consulta', this.obterHeadersAutorizacao())
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public selecionarPorId(id: string): Observable<VisualizarConsultaViewModel> {
        return this.http.get<ListarConsultaViewModel>(this.apiUrl + 'consulta/' + id, this.obterHeadersAutorizacao())
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public selecionarPorIdForm(id: string): Observable<FormConsultaViewModel> {
        return this.http.get<ListarConsultaViewModel>(this.apiUrl + 'consulta/' + id, this.obterHeadersAutorizacao())
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public inserir(consulta: FormConsultaViewModel): Observable<FormConsultaViewModel>
    {
        return this.http.post<FormConsultaViewModel>(this.apiUrl + 'consulta', consulta, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    public editar(id: string, consulta: VisualizarConsultaViewModel): Observable<FormConsultaViewModel>
    {
        return this.http.put<FormConsultaViewModel>(this.apiUrl + 'consulta/' + id, consulta, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    public excluir(id: string){
        return this.http.delete<VisualizarConsultaViewModel>(this.apiUrl + 'consulta/' + id, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
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