import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersModalComponent } from './list-orders-modal.component';

describe('ListOrdersModalComponent', () => {
  let component: ListOrdersModalComponent;
  let fixture: ComponentFixture<ListOrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
