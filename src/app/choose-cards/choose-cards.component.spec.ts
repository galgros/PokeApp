import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCardsComponent } from './choose-cards.component';

describe('ChooseCardsComponent', () => {
  let component: ChooseCardsComponent;
  let fixture: ComponentFixture<ChooseCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
