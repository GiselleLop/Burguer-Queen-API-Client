import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order';
import { OrdersService } from 'src/app/services/orders/orders.service';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  
  @Input() isSelected: boolean = false;
  @Input() btnName : string | undefined;
  @Input() btnClass : any
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();
  @Input() btnSrcImage : string | undefined;
  constructor(private ordersService: OrdersService) { }

  notificationsNumber: any;
  deliveringList: Order[] = [];
  ngOnInit(): void {
      this.ordersService.getPendingDeliveringOrders().subscribe((resp => {
        this.deliveringList = resp;
        this.notificationsNumber = this.deliveringList.filter(object => object.status === 'Delivering').length;
      }));
  }
  
  select(): void {
    this.selected.emit();

}

  getButtonSelectedStyle(): { [key: string]: string} {
    if (this.btnName === 'Send Order' || this.btnName === 'Delivered' ) {
      return {
        'background-color': this.btnName ? '#EE6A09' : '#D9D9D9',
        'color': this.btnName ? 'white' : 'black',
        'padding': this.btnName ? '10px 0' : '0',

      }
    }
    if (this.btnSrcImage === '../../../assets/images/back.png' || this.btnSrcImage === '../../../assets/images/cerrar-sesion.png') {
      return {
        'background-color': this.btnSrcImage ? 'transparent' : '#D9D9D9',
      }
    }
    
    if (this.btnSrcImage) {
      return {
        'background-color': this.btnSrcImage ? '#EE6A09' : '#D9D9D9',
        'color': this.btnName ? 'white' : 'black',
      }
    }
 
      return {
        'background-color': this.isSelected ? '#EE6A09' : '#D9D9D9',
        'color': this.isSelected ? 'white' : 'black',
        'padding': this.isSelected ? '10px 0' : '0',
      }
    }
  }
  


