import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacaoSistemaComponent } from './autenticacao-sistema.component';

describe('AutenticacaoSistemaComponent', () => {
  let component: AutenticacaoSistemaComponent;
  let fixture: ComponentFixture<AutenticacaoSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticacaoSistemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticacaoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
