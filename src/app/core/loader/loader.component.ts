import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './services/loarder.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {}

public loading: Subject<boolean> = this.loaderService.isLoading;  
}
