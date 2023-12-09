import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirCirurgiaComponent } from './inserir-cirurgia.component';

describe('InserirCirurgiaComponent', () => {
  let component: InserirCirurgiaComponent;
  let fixture: ComponentFixture<InserirCirurgiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserirCirurgiaComponent]
    });
    fixture = TestBed.createComponent(InserirCirurgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
