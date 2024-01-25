import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterOrderStatusComponent } from './waiter-order-status.component';

describe('WaiterOrderStatusComponent', () => {
  let component: WaiterOrderStatusComponent;
  let fixture: ComponentFixture<WaiterOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
