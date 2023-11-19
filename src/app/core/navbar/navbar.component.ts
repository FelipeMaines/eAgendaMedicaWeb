import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  events: string[] = [];
  opened: boolean = true;

  // links = [{
  //  link: 'medico'
  //  nome: 
  // }]
}
