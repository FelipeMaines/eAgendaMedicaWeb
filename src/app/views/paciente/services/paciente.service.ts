import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { ListarPacienteViewModel } from "../models/listar-paciente.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormPacienteViewModel } from "../models/form-paciente.view-model";
import { VisualizarPacienteViewModel } from "../models/visualizar-paciente.view-model";
import { LocalStorageService } from "src/app/auth/services/local-storage.service";

@Injectable()
export class PacienteService {
    apiUlr: string = environment.apiUrl;

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

    public selecionarTodos(): Observable<ListarPacienteViewModel[]> {
        return this.http.get<ListarPacienteViewModel[]>(this.apiUlr + 'paciente', this.obterHeadersAutorizacao())
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public selecionarPorIdForm(id: string): Observable<FormPacienteViewModel> {
        console.log('servico selecionar form' + '  '+ id)
        return this.http.get<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id, this.obterHeadersAutorizacao())
        .pipe(
            map(res => this.processarDados(res)),
            catchError(err => this.processarFalha(err))
        );
    }

    public excluir(id: string): Observable<VisualizarPacienteViewModel>{
        return this.http.delete(this.apiUlr + 'paciente/' + id, this.obterHeadersAutorizacao())
        .pipe(
            map((res) => this.processarDados(res)),
            catchError((err) => this.processarFalha(err))
        )
    }

    public selecionarPorId(id: string): Observable<VisualizarPacienteViewModel> {
        return this.http.get<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id, this.obterHeadersAutorizacao())
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
        return this.http.put<FormPacienteViewModel>(this.apiUlr + 'paciente/' + id, paciente, this.obterHeadersAutorizacao())
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
        const token = this.localStorageService.obterTokenUsuario();

        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          })
        }
      }
}
