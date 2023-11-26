import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaprimaPrimaHistoricoReadComponent } from './materiaprima-prima-historico-read.component';

describe('MateriaprimaPrimaHistoricoReadComponent', () => {
  let component: MateriaprimaPrimaHistoricoReadComponent;
  let fixture: ComponentFixture<MateriaprimaPrimaHistoricoReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaprimaPrimaHistoricoReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaprimaPrimaHistoricoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
