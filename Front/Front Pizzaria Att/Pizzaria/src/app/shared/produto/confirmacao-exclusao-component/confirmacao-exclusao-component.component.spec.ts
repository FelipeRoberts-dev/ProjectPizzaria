import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoExclusaoComponentComponent } from './confirmacao-exclusao-component.component';

describe('ConfirmacaoExclusaoComponentComponent', () => {
  let component: ConfirmacaoExclusaoComponentComponent;
  let fixture: ComponentFixture<ConfirmacaoExclusaoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoExclusaoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacaoExclusaoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
