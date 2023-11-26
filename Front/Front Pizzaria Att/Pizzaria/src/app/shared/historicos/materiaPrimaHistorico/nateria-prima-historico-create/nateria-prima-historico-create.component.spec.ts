import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMateriaPrimasCriarComponent } from './nateria-prima-historico-create.component';

describe('NateriaPrimaHistoricoCreateComponent', () => {
  let component: HistoricoMateriaPrimasCriarComponent;
  let fixture: ComponentFixture<HistoricoMateriaPrimasCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMateriaPrimasCriarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoMateriaPrimasCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
