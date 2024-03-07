import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { map, catchError, filter  } from 'rxjs/operators';
import { productInter } from 'src/app/shared/interfaces/product';
import { Order } from 'src/app/shared/interfaces/order';
import { orderedProducts } from 'src/app/shared/interfaces/order';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private authService: AuthenticationServiceService, private http: HttpClient) { }

  private URL_PRODUCTS = 'https://api-burguer-queen-bqac1.onrender.com/products';
  private URL_ORDERS = 'https://api-burguer-queen-bqac1.onrender.com/orders';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  })

  clickedProductSubject = new BehaviorSubject<productInter | null>(null);
  clickedProduct$ =  this.clickedProductSubject.asObservable();

  clientNameSource = new BehaviorSubject<string>('');
  clientName$ = this.clientNameSource.asObservable();

  
  orderPendingSelectedSubject = new BehaviorSubject<Order | null>(null);
  orderPendingSelected$ = this.orderPendingSelectedSubject.asObservable();

  orderUpdatedSubject = new Subject<number>();
  orderUpdated$ = this.orderUpdatedSubject.asObservable();

  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];

  getProducts(): Observable<productInter[]>{
    return this.http.get<productInter[]>(`${this.URL_PRODUCTS}`, {headers: this.headers})
  }

  filterBreakfastMenu(products: productInter[]): productInter[] {
    const breakfastBeverages = [1, 5];
    return products.filter(product => product.type === 'Breakfast' || breakfastBeverages.includes(product.id));
  }
  filterLunchAndDinnerMenu(products: productInter[]): productInter[] {
    const lunchBeverages = [2, 6, 7];
    return products.filter(product => product.type === 'Lunch' || product.type === 'Sides' || lunchBeverages.includes(product.id));
  }

  getImageUrl(url: string, fallbackUrl: string): Observable<string> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => (response.status === 200 ? url : fallbackUrl)),
      catchError(() => of(fallbackUrl))
    );
  }

  postOrder(order: object): Observable<Order>{;
     return this.http.post<Order>(this.URL_ORDERS, order, {headers: this.headers})
   }

  getOrders(): Observable<Order[]>{
      return this.http.get<Order[]>(`${this.URL_ORDERS}`, {headers: this.headers})
    }

  deleteOrders(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_ORDERS}/${orderId}`, { headers: this.headers })
  }
  
  updateOrderStatus(orderId: number, status: string): Observable<Order>{
    const updateData = { status }
    return this.http.patch<Order>(`${this.URL_ORDERS}/${orderId}`, updateData, { headers: this.headers })
  }
  
  updateOrderTime(orderId: number, elapsedTime: string): Observable<Order>{
    const updateTime = { elapsedTime }
    return this.http.patch<Order>(`${this.URL_ORDERS}/${orderId}`, updateTime, { headers: this.headers })
  }

  getPendingDeliveringOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL_ORDERS}`, { headers: this.headers }).pipe(
      map((orders: Order[]) => {
        return orders.filter(order => order.status === 'Pending' || order.status === 'Delivering');
      })
    );
  }

  getDeliveredOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.URL_ORDERS}`, { headers: this.headers }).pipe(
      map((orders: Order[]) => {
      return orders.filter(order => order.status === 'Delivered');
      })
    );
  }
  

  // orderedProductsSummary(product: productInter): orderedProducts[]{
  //   const orderedProducts: orderedProducts[] = [];
  //   let totalPrice: number = 0;
  //   const existingProduct = orderedProducts.find(orderedProduct => orderedProduct.product?.id === product.id);
  // if (existingProduct) {
  //   existingProduct.qty += 1;
  //   totalPrice += product.price 
  // } else {
  //   orderedProducts.push({ qty: 1, product });
  //   totalPrice += product.price 
  // }
  // return orderedProducts
  // }

}
