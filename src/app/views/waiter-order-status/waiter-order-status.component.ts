import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-waiter-order-status',
  templateUrl: './waiter-order-status.component.html',
  styleUrls: ['./waiter-order-status.component.css']
})
export class WaiterOrderStatusComponent implements OnInit {
  orderPendingSelected : Order | null = null

  constructor(private router: Router, private ordersService: OrdersService) { }
  ngOnInit(): void {
    this.ordersService.orderPendingSelected$.subscribe(clickedOrder => {
      if (clickedOrder === null) {
        console.log(clickedOrder);
      }
      this.orderPendingSelected = clickedOrder
      console.log(clickedOrder);
    })
  }

   onDeliveredButtonClick(): void{

    console.log(this.orderPendingSelected);
    
    if( this.orderPendingSelected?.status === 'Delivering') {
      const orderId = this.orderPendingSelected.id;
      const newStatus = 'Delivered';
            
     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      console.log(updatedOrder);
      
      this.ordersService.orderUpdatedSubject.next(updatedOrder.id)
    
     })
    }  
    // if(this.selectedOrder && this.selectedOrder.status === 'Pending'){
    //   this.openDialog()
    // }
  }

  backToMenu() {
    this.router.navigate(['/waiter']);
  }

}
