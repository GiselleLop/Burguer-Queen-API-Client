import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { OrderDetailsComponent } from 'src/app/components/order-details/order-details.component';
import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  buttonDisabled: boolean = false;
  @ViewChild(OrderDetailsComponent) child!: OrderDetailsComponent; 
  @Input() ordersList: Order[] = [];
  orderSelected: Order | null = null
  alertMessage: string | null = null


  constructor(private kitchenService: KitchenServiceService,  private ordersService: OrdersService) {
    this.kitchenService.clickedOrder$.subscribe(resp => {
      this.orderSelected = resp
      if (!this.orderSelected) {
        this.buttonDisabled = false;
      }else if (this.orderSelected.status === "Delivering"  ) {
        this.buttonDisabled = false;
      }
       else if (this.orderSelected  ) {
        this.buttonDisabled = true;
      }
    })}

  ngOnInit(): void {}
  
  
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
