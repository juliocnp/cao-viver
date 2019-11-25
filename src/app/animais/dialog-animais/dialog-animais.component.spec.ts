import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimaisComponent } from './dialog-animais.component';

describe('DialogAnimaisComponent', () => {
  let component: DialogAnimaisComponent;
  let fixture: ComponentFixture<DialogAnimaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAnimaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
