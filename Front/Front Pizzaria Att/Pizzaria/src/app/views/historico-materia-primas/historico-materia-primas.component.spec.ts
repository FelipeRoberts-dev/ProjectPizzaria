import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMateriaPrimasComponent } from './historico-materia-primas.component';

describe('HistoricoMateriaPrimasComponent', () => {
  let component: HistoricoMateriaPrimasComponent;
  let fixture: ComponentFixture<HistoricoMateriaPrimasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMateriaPrimasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoMateriaPrimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
