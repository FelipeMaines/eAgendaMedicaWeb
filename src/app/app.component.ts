import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoaderService } from './core/loader/services/loarder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  estaCarregando?: Observable<boolean>;


  constructor(private router: Router, private loadService: LoaderService) {
    this.router.events.subscribe(routerEvent => {
      this.checkRouterEvent(routerEvent as RouterEvent);
    });}

    checkRouterEvent(routerEvent: RouterEvent) {
      if (routerEvent instanceof NavigationStart)
          this.loadService.show();
  
      if (
          routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError
      ) {
          this.loadService.hide();
      }
  
      this.estaCarregando = this.loadService.estaCarregando();
    }
}
