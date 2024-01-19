import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { productInter } from 'src/app/shared/interfaces/product';
import { orderedProducts } from 'src/app/shared/interfaces/order';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  listOrder: orderedProducts[] = []
  products: productInter[] = []
  totalPrice: number = 0
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
this.productService.arrayProductsToOrder$.subscribe(products => {
    this.products = products;
    this.listOrder.push({qty:1,  product: this.products})
      console.log('Productos actualizados:', this.listOrder);
  })
  }

  totalSummary() {
  
  }

}
