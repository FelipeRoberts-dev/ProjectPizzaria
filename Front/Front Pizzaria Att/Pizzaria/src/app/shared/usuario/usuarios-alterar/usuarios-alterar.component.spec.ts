import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAlterarComponent } from './usuarios-alterar.component';

describe('UsuariosAlterarComponent', () => {
  let component: UsuariosAlterarComponent;
  let fixture: ComponentFixture<UsuariosAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosAlterarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
