import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { ListarPacienteViewModel } from "../models/listar-paciente.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormPacienteViewModel } from "../models/form-paciente.view-model";

@Injectable()
export class PacienteService {
    apiUlr: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    public selecionarTodos(): Observable<ListarPacienteViewModel[]> {
        return this.http.get<ListarPacienteViewModel[]>(this.apiUlr + 'paciente')
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public inserir(paciente: FormPacienteViewModel): Observable<FormPacienteViewModel>{
        return this.http.post<FormPacienteViewModel>(this.apiUlr + 'paciente', paciente)
        .pipe(
            map((this.processarDados)), catchError(this.processarFalha)
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
        return {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer`
          })
        }
      }
}
