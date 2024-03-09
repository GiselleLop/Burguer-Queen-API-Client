import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
//import { WaiterComponent } from './views/waiter/waiter.component';
import { AuthGuard } from './auth.guard';
import { WaiterOrderStatusComponent } from './views/waiter-order-status/waiter-order-status.component';
import { RoleComponent } from './views/role/role.component';
import { AuthenticationServiceService } from './services/authentication/authentication-service.service';
const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  // {
  //   path: 'waiter',
  //   component: WaiterComponent,
  //   canActivate: [AuthGuard],
  //  data: 
  //     { allowedRoles: ['waiter'] } 
  // },
  // {

  {
    path: 'waiter',
    component: RoleComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['waiter'] } 
  },
  {
    path: 'kitchen',
    component: RoleComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['chef'] } 
  }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'waiter/orders',
    component: WaiterOrderStatusComponent,
    canActivate: [AuthGuard],
    data: 
      { allowedRoles: ['waiter'] } 

  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
