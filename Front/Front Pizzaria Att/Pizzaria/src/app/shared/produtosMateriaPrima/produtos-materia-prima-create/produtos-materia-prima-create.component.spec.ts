import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosMateriaPrimaCreateComponent } from './produtos-materia-prima-create.component';

describe('ProdutosMateriaPrimaCreateComponent', () => {
  let component: ProdutosMateriaPrimaCreateComponent;
  let fixture: ComponentFixture<ProdutosMateriaPrimaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosMateriaPrimaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosMateriaPrimaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
