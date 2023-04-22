import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosMateriaPrimaComponent } from './produtos-materia-prima.component';

describe('ProdutosMateriaPrimaComponent', () => {
  let component: ProdutosMateriaPrimaComponent;
  let fixture: ComponentFixture<ProdutosMateriaPrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosMateriaPrimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosMateriaPrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
