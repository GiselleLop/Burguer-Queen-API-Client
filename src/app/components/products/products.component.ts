import { Component, Input, OnInit } from '@angular/core';
import { productInter } from 'src/app/shared/interfaces/product';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

 @Input() product: productInter | undefined;
 
  constructor(private productService : ProductsService) { }

  ngOnInit(): void {
  }
  sendProduct(product: any): void {
    this.productService.sendProductToOrder(product)
}
}
