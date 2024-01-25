import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';

@Component({
  selector: 'app-orders-pending-delivering',
  templateUrl: './orders-pending-delivering.component.html',
  styleUrls: ['./orders-pending-delivering.component.css']
})
export class OrdersPendingDeliveringComponent implements OnInit {
deliveringPendingList: Order[] | null | undefined = [];
selectedOrderIndex: Order | null = null;
selectedOrder: Order | null = null

  constructor(private ordersService: OrdersService, private kitchenService: KitchenServiceService) {}

  ngOnInit(): void {
    this.ordersService.setPendingDeliveringOrders()
    this.ordersService.PendingDeliveringOrders$.subscribe(resp => 
      this.deliveringPendingList = resp
      )
     this.sortOrderByStatus();
 
  }


  onOrderClick(order: Order): void {
    this.selectedOrderIndex = order;
    this.ordersService.setOrderToDelivered(order);
    }

  onDeliveredButtonClick(){
    if(this.selectedOrderIndex){
      const orderId = this.selectedOrderIndex.id;
      const newStatus = 'Delivered';
      
    this.deliveringPendingList = this.deliveringPendingList?.filter(order => order.id !== orderId);

     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      this.ordersService.getDeliveredOrders()
     })
    }  
  }

  statusStyleWaiter(status: string): object {
    if (status === 'Delivering') {
      return { color: '#EE6A09' };
    } else if (status === 'Pending') {
      return { color: '#EE0909' };
    }
    return { color: '#3BBA26' }
  }

  sortOrderByStatus() {
    this.deliveringPendingList?.sort((a: Order, b: Order): number => {
      if (a.status === b.status) {
        return 0
      }
      return a.status === 'Pending' ? 1 : -1
    })
  }
}
