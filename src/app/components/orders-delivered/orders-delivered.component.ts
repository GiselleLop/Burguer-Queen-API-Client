import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-orders-delivered',
  templateUrl: './orders-delivered.component.html',
  styleUrls: ['./orders-delivered.component.css']
})
export class OrdersDeliveredComponent implements OnInit {
  showOrder: Order | null = null
  private subscription: Subscription;

  constructor( private ordersService: OrdersService) { 
    this.subscription = this.ordersService.clickedOrderDelivered$.subscribe(resp => {
      this.showOrder = resp;      console.log(this.showOrder, ' show order');
    });}


  ngOnInit(): void {
  }

}
