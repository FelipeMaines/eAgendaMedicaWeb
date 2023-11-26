import { Component, OnInit } from '@angular/core';
import { ListarCirurgiaViewModel } from '../models/listar-cirurgia.view-model';
import { CirurgiaService } from '../services/cirurgia.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-listar-cirurgia',
  templateUrl: './listar-cirurgia.component.html',
  styleUrls: ['./listar-cirurgia.component.scss']
})
export class ListarCirurgiaComponent implements OnInit{

  cirurgiaVM$!: Observable<ListarCirurgiaViewModel[]>;

  constructor(private cirurgiaService: CirurgiaService){}

  ngOnInit(): void {
   this.cirurgiaVM$ = this.cirurgiaService.selecionarTodos()
  }

}
