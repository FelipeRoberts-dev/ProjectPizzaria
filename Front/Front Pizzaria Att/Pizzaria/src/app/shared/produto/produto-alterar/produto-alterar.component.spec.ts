import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoAlterarComponent } from './produto-alterar.component';

describe('ProdutoAlterarComponent', () => {
  let component: ProdutoAlterarComponent;
  let fixture: ComponentFixture<ProdutoAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoAlterarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
