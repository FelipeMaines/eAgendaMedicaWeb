import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { ListarMedicoViewModel } from "../models/listar-medico.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormMedicoViewModel } from "../models/form-medico.view-model";
import { VisualizarMedicoViewModel } from "../models/visualizar-medico.view-model";

@Injectable()
export class MedicoService{
    apiUlr: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public selecionarTodos(): Observable<ListarMedicoViewModel[]> {
        
        return this.http.get<ListarMedicoViewModel[]>(this.apiUlr + 'medico', this.obterHeadersAutorizacao())
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public selecionarPorId(id: string): Observable<VisualizarMedicoViewModel> {
        return this.http.get<VisualizarMedicoViewModel>(this.apiUlr + 'medico/' + id)
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public filtrarTopDezPorData(data: string) : Observable<ListarMedicoViewModel[]>{
        const url = this.apiUlr + 'Medico/Data?time=' + encodeURIComponent(data);

        return this.http.get<ListarMedicoViewModel[]>(url)
          .pipe(
            map(this.processarDados),
            catchError(this.processarFalha)
          );
    }

    public inserir(medicoVm: FormMedicoViewModel): Observable<FormMedicoViewModel>{
        return this.http.post<FormMedicoViewModel>(this.apiUlr + 'medico', medicoVm, this.obterHeadersAutorizacao())
        .pipe(
            map(this.processarDados), catchError(this.processarFalha));
    }

    public editar(medicoVM: FormMedicoViewModel, id: string): Observable<FormMedicoViewModel>
    {
        return this.http.put<FormMedicoViewModel>(this.apiUlr + 'medico/' + id, medicoVM)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    public excluir(id: string){
        return this.http.delete(this.apiUlr + 'medico/' + id)
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        )
    }

    private processarDados(resposta: any) {
        if (resposta?.sucesso)
        {
            return resposta.dados;
        }
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