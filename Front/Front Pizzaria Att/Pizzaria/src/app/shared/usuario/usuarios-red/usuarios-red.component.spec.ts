import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRedComponent } from './usuarios-red.component';

describe('UsuariosRedComponent', () => {
  let component: UsuariosRedComponent;
  let fixture: ComponentFixture<UsuariosRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosRedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
