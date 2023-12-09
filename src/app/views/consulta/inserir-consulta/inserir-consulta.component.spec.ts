import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirConsultaComponent } from './inserir-consulta.component';

describe('InserirConsultaComponent', () => {
  let component: InserirConsultaComponent;
  let fixture: ComponentFixture<InserirConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserirConsultaComponent]
    });
    fixture = TestBed.createComponent(InserirConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
