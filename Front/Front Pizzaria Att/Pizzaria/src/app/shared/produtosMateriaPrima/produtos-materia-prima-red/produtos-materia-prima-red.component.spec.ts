import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosMateriaPrimaRedComponent } from './produtos-materia-prima-red.component';

describe('ProdutosMateriaPrimaRedComponent', () => {
  let component: ProdutosMateriaPrimaRedComponent;
  let fixture: ComponentFixture<ProdutosMateriaPrimaRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosMateriaPrimaRedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosMateriaPrimaRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
