import { Component, OnInit, Input } from '@angular/core';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { Order } from 'src/app/shared/interfaces/order';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  
  private subscription: Subscription;
  buttonDisabled: boolean = false; 
  @Input() ordersList: Order[] = [];
  orderSelected: Order | null = null
  alertMessage: string | null = null


  constructor(private kitchenService: KitchenServiceService,  private ordersService: OrdersService ) {
    this.subscription = this.kitchenService.clickedOrder$.subscribe(resp => {
      this.orderSelected = resp});
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onButtonDone(){
    if(this.orderSelected?.status === "Pending"){
      const orderId = this.orderSelected.id;
      const newStatus = 'Delivering';
      const finalTime = this.kitchenService.calculateElapsedTime(this.orderSelected.dataEntry, new Date())
      this.alertMessage = "Delivering order successfully"
      setTimeout(() => {
        this.alertMessage = null;
        this.kitchenService.setOrderKitchen(null)
      }, 2000); 
      this.ordersService.updateOrderTime(orderId, finalTime).subscribe();
     this.ordersService.updateOrderStatus(orderId, newStatus).subscribe(updatedOrder => {
      this.ordersService.orderUpdatedSubject.next(updatedOrder.id)
     })
    }  
    
  }

}
