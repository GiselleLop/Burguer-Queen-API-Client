import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order';
import { OrderSummaryComponent } from 'src/app/components/order-summary/order-summary.component';
@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})

export class WaiterComponent implements OnInit {
  alertMessage: string | null = null;
  productsList: productInter[] = [];
  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];
  isLunchAndDinnerSelected: boolean = false;
  isBreakfastSelected: boolean = true;
  @ViewChild(OrderSummaryComponent) child!: OrderSummaryComponent; 

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ordersService.getProducts().subscribe((resp => {
      this.productsList = resp
      this.productsList.forEach(product => {
        this.ordersService.getImageUrl(product.image, '../../../assets/images/Image20240112141757.png').subscribe(result => {
          product.image = result
        })
      })
    this.filterMenus();
    }))
  }
  filterMenus(): void {
    this.breakfastMenu = this.ordersService.filterBreakfastMenu(this.productsList);
    this.lunchAndDinnerMenu = this.ordersService.filterLunchAndDinnerMenu(this.productsList);
    this.currentMenu = this.breakfastMenu;
  }
  handleBreakfastSelection(): void {
    this.isBreakfastSelected = true;
    this.isLunchAndDinnerSelected = false;
    this.showMenu()
  }
  handleLunchAndDinnerSelection(): void {
    this.isLunchAndDinnerSelected = true;
    this.isBreakfastSelected = false;
    this.showMenu()
  }
  viewOrdersStatus() {
    this.router.navigate(['/waiter/orders']);
  }
  showMenu():void {
    if (this.isBreakfastSelected ) {
      this.currentMenu = this.breakfastMenu;
       }
       if (this.isLunchAndDinnerSelected ) {
        this.currentMenu = this.lunchAndDinnerMenu;
      }
  }
 

//
  onSendOrderClick(): string | void {
    if (this.child.clientName === '' && this.child.orderedProducts.length === 0) {
      return this.alertMessage = 'There are no products selected and client name is null.';
    } else if (this.child.clientName === '') {
      return  this.alertMessage = 'Client name is required';
    } else if (this.child.orderedProducts.length === 0) {
      return this.alertMessage = 'No products selected';
    }
    const order: Order = {
      client: this.child.clientName, 
      products: this.child.orderedProducts,
      status: 'Pending', 
      dataEntry: new Date(),
      id: 0, 
      total: this.child.totalPrice,
    };
    
    this.ordersService.postOrder(order).subscribe((response => {
      this.ordersService.clientNameSource.next('')
      this.child.orderedProducts =  [];
      this.child.totalPrice = 0; 
      this.alertMessage = 'Order sent successfully';
      setTimeout(() => {
        this.alertMessage = null;
      }, 2000); 
    }),
    );
  }

}
