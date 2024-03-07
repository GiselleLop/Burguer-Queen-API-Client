import { Component, OnInit } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { Order } from 'src/app/shared/interfaces/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  showOrder: Order | null = null
  private subscription: Subscription;

  constructor(private kitchenService: KitchenServiceService) {
    this.subscription = this.kitchenService.clickedOrder$.subscribe(resp => {
      this.showOrder = resp});
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
