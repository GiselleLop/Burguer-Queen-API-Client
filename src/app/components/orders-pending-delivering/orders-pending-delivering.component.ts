import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';
@Component({
  selector: 'app-orders-pending-delivering',
  templateUrl: './orders-pending-delivering.component.html',
  styleUrls: ['./orders-pending-delivering.component.css']
})
export class OrdersPendingDeliveringComponent implements OnInit {

  constructor(private ordersService: OrdersService) {
   }

orderList: Order[] = []
FilterList: Order[] = []
selectedOrderIndex: Order | null = null;

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((resp => {
      this.orderList = resp;
      console.log(resp);
      console.log(this.orderList);
  
 this.divideOrdersForStatus(this.orderList)
 console.log(this.FilterList);
      
    })) 
   
  }

  
  statusStyleWaiter(status: string): object {
    if (status === 'Delivering') {
      return { color: '#EE6A09' };
    } else if (status === 'Pending') {
    return {color: 'red'}
    }
    return { color: '#3BBA26' };
  }


  onOrderClick(order: Order): void {
    this.selectedOrderIndex = order;
   // 
  }
  delivered(order:Order) : void  {
    const newStatus = 'Delivered';
   this.ordersService.updateOrderStatus(order?.id, newStatus).subscribe(updatedOrder => {
      this.ordersService.notifyOrderUpdated(updatedOrder.id)
     })
     this.ordersService.setOrderToDelivered(order)
  }


  divideOrdersForStatus(orderList: Order[]) {
 this.FilterList = orderList.filter(resp => {
resp.status === 'Pending'})
console.log(this.FilterList);
  }
 
}
