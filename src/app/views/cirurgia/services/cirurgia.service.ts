import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { ListarCirurgiaViewModel } from "../models/listar-cirurgia.view-model";
import { FormCirurgiaViewModel } from "../models/form-cirurgia.view-model";
import { VisualizarCirurgiaViewModel } from "../models/visualizar-cirurgia.view-model";

@Injectable()
export class CirurgiaService{
    apiUrl:string = environment.apiUrl;

    constructor(private http: HttpClient){}

    public selecionarTodos(): Observable<ListarCirurgiaViewModel[]>{
        return this.http.get<ListarCirurgiaViewModel[]>(this.apiUrl + 'cirurgia')
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public selecionarPorId(id: string): Observable<VisualizarCirurgiaViewModel>{
        return this.http.get<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public inserir(cir: FormCirurgiaViewModel): Observable<FormCirurgiaViewModel>{
        return this.http.post<FormCirurgiaViewModel>(this.apiUrl + 'cirurgia', cir)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public editar(cir: FormCirurgiaViewModel, id:string): Observable<FormCirurgiaViewModel>{
        return this.http.put<FormCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id, cir)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public excluir(id: string){
        return this.http.delete<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id)
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
}