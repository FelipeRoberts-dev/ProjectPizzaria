import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRefComponent } from './dialog-ref.component';

describe('DialogRefComponent', () => {
  let component: DialogRefComponent;
  let fixture: ComponentFixture<DialogRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
