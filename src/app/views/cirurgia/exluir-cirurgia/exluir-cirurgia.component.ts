import { Component, OnInit } from '@angular/core';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CirurgiaService } from '../services/cirurgia.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-exluir-cirurgia',
  templateUrl: './exluir-cirurgia.component.html',
  styleUrls: ['./exluir-cirurgia.component.scss']
})
export class ExcluirCirurgiaComponent implements OnInit{
  cirurgiaVM!: VisualizarCirurgiaViewModel
 
  constructor(private route: ActivatedRoute, private router: Router, private cirurgiaService: CirurgiaService, private notificacao: NotificationService){}
  
  ngOnInit(): void {
    this.cirurgiaVM = this.route.snapshot.data['cirurgia'];
  }
}
