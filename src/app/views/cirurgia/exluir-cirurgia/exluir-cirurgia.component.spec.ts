import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirCirurgiaComponent } from './exluir-cirurgia.component';

describe('ExluirCirurgiaComponent', () => {
  let component: ExcluirCirurgiaComponent;
  let fixture: ComponentFixture<ExcluirCirurgiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcluirCirurgiaComponent]
    });
    fixture = TestBed.createComponent(ExcluirCirurgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
