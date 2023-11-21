import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ListarConsultaViewModel } from "../models/listar-consulta.view-model";
import { VisualizarConsultaViewModel } from "../models/visualizar-consulta.view-model";
import { FormConsultaViewModel } from "../models/form-consulta.view-model";

@Injectable()
export class ConsultaService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public selecionarTodos(): Observable<ListarConsultaViewModel[]> {
        return this.http.get<ListarConsultaViewModel[]>(this.apiUrl + 'consulta')
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public selecionarPorId(id: string): Observable<VisualizarConsultaViewModel> {
        return this.http.get<ListarConsultaViewModel>(this.apiUrl + 'consulta/' + id)
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public selecionarPorIdForm(id: string): Observable<FormConsultaViewModel> {
        return this.http.get<ListarConsultaViewModel>(this.apiUrl + 'consulta/' + id)
            .pipe(
                map(res => this.processarDados(res)),
                catchError(err => this.processarFalha(err))
        )
    }

    public inserir(consulta: FormConsultaViewModel): Observable<FormConsultaViewModel>
    {
        return this.http.post<FormConsultaViewModel>(this.apiUrl + 'consulta', consulta)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    public editar(id: string, consulta: VisualizarConsultaViewModel): Observable<FormConsultaViewModel>
    {
        return this.http.put<FormConsultaViewModel>(this.apiUrl + 'consulta/' + id, consulta)
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
}