import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { ListarPacienteViewModel } from "../models/listar-paciente.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormPacienteViewModel } from "../models/form-paciente.view-model";
import { VisualizarPacienteViewModel } from "../models/visualizar-paciente.view-model";

@Injectable()
export class PacienteService {
    apiUlr: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public selecionarTodos(): Observable<ListarPacienteViewModel[]> {
        return this.http.get<ListarPacienteViewModel[]>(this.apiUlr + 'paciente', this.obterHeadersAutorizacao())
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public selecionarPorIdForm(id: string): Observable<FormPacienteViewModel> {
        console.log('servico selecionar form' + '  '+ id)
        return this.http.get<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        );
    }

    public excluir(id: string): Observable<VisualizarPacienteViewModel>{
        return this.http.delete(this.apiUlr + 'paciente/' + id)
        .pipe(
            map((res) => this.processarDados(res)),
            catchError((err) => this.processarFalha(err))
        )
    }

    public selecionarPorId(id: string): Observable<VisualizarPacienteViewModel> {
        return this.http.get<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        );
    }

    public inserir(paciente: FormPacienteViewModel): Observable<FormPacienteViewModel>{
        return this.http.post<FormPacienteViewModel>(this.apiUlr + 'paciente', paciente, this.obterHeadersAutorizacao())
        .pipe(
            map((this.processarDados)), catchError(this.processarFalha)
        )
    }

    public editar(paciente: FormPacienteViewModel, id: string): Observable<FormPacienteViewModel>{
        console.log('editar');
        console.log(paciente);
        return this.http.put<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id, paciente)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    private processarDados(resposta: any) {
        if (resposta?.sucesso)
            return resposta.dados;
        else
            return resposta;
    }

    private processarFalha(resposta: any) {
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
