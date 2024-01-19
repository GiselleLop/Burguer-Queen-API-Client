import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { productInter } from 'src/app/shared/interfaces/product';
import { Order, orderedProducts } from 'src/app/shared/interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private arrayProductsToOrder: productInter[] = [];
  private arrayProductsToOrderSubject: BehaviorSubject<productInter[]> = new BehaviorSubject<productInter[]>([]);
  arrayProductsToOrder$: Observable<productInter[]> = this.arrayProductsToOrderSubject.asObservable();

  constructor(private http: HttpClient,  private authService: AuthenticationServiceService) {}

  private URL_ORDERS = 'https://burguer-queen-api-bqac1.onrender.com/orders';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  })

  sendProductToOrder(product:productInter){
     this.arrayProductsToOrderSubject.next([...this.arrayProductsToOrderSubject.value, product]);
   // return this.http.post<Order>(this.URL_ORDERS, this.arrayProductsToOrder, {headers: this.headers})

  }

  // sendOrderToKitchen() {
  //   return this.http.post<Order>(this.URL_ORDERS, this.arrayProductsToOrder, {headers: this.headers})
  // }
 
}