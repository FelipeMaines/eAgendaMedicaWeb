import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        return this.http.get<ListarCirurgiaViewModel[]>(this.apiUrl + 'cirurgia', this.obterHeadersAutorizacao())
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
        return this.http.post<FormCirurgiaViewModel>(this.apiUrl + 'cirurgia', cir, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err)))
    }

    public editar(cir: VisualizarCirurgiaViewModel, id:string): Observable<VisualizarCirurgiaViewModel>{
        return this.http.put<VisualizarCirurgiaViewModel>(this.apiUrl + 'cirurgia/' + id, cir)
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

    private obterHeadersAutorizacao() {
        const token = environment.apiUrl;
    
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZGI1YjI4OC0zYzlhLTRjZTQtYzM3Ny0wOGRiZWUxMjMwMTAiLCJlbWFpbCI6ImZlbGlwYW9AZ21haWwuY29tIiwidW5pcXVlX25hbWUiOiJmZWxpcGFvIiwiZ2l2ZW5fbmFtZSI6ImZlbGlwYW8iLCJuYmYiOjE3MDA5NTY3NjYsImV4cCI6MTcwMTM4ODc2NiwiaWF0IjoxNzAwOTU2NzY2LCJpc3MiOiJlQWdlbmRhTWVkaWNhIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.-n4W32dGUvT15apb9O3QdKDCXb4r21XeR-sCA7i03t0`
          })
        }
      }
}