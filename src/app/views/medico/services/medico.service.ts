import { HttpClient } from "@angular/common/http";
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
        return this.http.get<ListarMedicoViewModel[]>(this.apiUlr + 'medico')
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public selecionarPorId(id: string): Observable<VisualizarMedicoViewModel> {
        return this.http.get<VisualizarMedicoViewModel>(this.apiUlr + 'medico/' + id)
            .pipe(
                map(this.processarDados), catchError(this.processarFalha));
    }

    public inserir(medicoVm: FormMedicoViewModel): Observable<FormMedicoViewModel>{
        return this.http.post<FormMedicoViewModel>(this.apiUlr + 'medico', medicoVm)
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
            return resposta.dados;
        else
            return resposta;
    }

    private processarFalha(resposta: any) {
        return throwError(() => new Error(resposta.error.erros[0]));
    }

}