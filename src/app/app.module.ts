import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { WaiterComponent } from './views/waiter/waiter.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { ClientNameInputComponent } from './components/client-name-input/client-name-input.component';
import { KitchenComponent } from './views/kitchen/kitchen.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { WaiterOrderStatusComponent } from './views/waiter-order-status/waiter-order-status.component';
import { OrdersPendingDeliveringComponent } from './components/orders-pending-delivering/orders-pending-delivering.component';
import { OrdersDeliveredComponent } from './components/orders-delivered/orders-delivered.component';
import { ModalOrderNotReadyComponent } from './components/modal-order-not-ready/modal-order-not-ready.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    WaiterComponent,
    HeaderComponent,
    ProductsComponent,
    OrderSummaryComponent,
    LogoutModalComponent,
    ClientNameInputComponent,
    KitchenComponent,
    OrdersComponent,
    OrderDetailsComponent,
    WaiterOrderStatusComponent,
    OrdersPendingDeliveringComponent,
    OrdersDeliveredComponent,
    ModalOrderNotReadyComponent,
    ButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule, 
    FormsModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
