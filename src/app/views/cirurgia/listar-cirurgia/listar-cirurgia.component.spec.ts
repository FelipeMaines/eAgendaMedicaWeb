import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCirurgiaComponent } from './listar-cirurgia.component';

describe('ListarCirurgiaComponent', () => {
  let component: ListarCirurgiaComponent;
  let fixture: ComponentFixture<ListarCirurgiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarCirurgiaComponent]
    });
    fixture = TestBed.createComponent(ListarCirurgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
