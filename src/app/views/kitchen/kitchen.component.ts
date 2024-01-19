import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order, orderedProducts } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  constructor(private orderService: OrdersService) { }
  list: Order[] = []
  order: Order[] = []
//  ordenId: number
  ngOnInit(): void {  
  this.load()
  
  }
  load(){
    this.orderService.getOrders().subscribe(resp=> {
      this.list = resp
      console.log(this.list)
   //   this.getNewOrders()
      })
//   }
//  getNewOrders() {
//   this.order = this.list.slice(145)
// console.log(this.order, ' new');

}


  
}
