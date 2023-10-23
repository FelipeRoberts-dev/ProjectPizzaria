import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosMateriaPrimaAlterarComponent } from './produtos-materia-prima-alterar.component';

describe('ProdutosMateriaPrimaAlterarComponent', () => {
  let component: ProdutosMateriaPrimaAlterarComponent;
  let fixture: ComponentFixture<ProdutosMateriaPrimaAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosMateriaPrimaAlterarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosMateriaPrimaAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
