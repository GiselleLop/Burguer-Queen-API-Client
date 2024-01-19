import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersButtonComponent } from './list-orders-button.component';

describe('ListOrdersButtonComponent', () => {
  let component: ListOrdersButtonComponent;
  let fixture: ComponentFixture<ListOrdersButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdersButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
