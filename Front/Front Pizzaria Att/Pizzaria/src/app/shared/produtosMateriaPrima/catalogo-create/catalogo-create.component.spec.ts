import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoCreateComponent } from './catalogo-create.component';

describe('CatalogoCreateComponent', () => {
  let component: CatalogoCreateComponent;
  let fixture: ComponentFixture<CatalogoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
