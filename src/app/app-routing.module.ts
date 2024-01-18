import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { WaiterComponent } from './views/waiter/waiter.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  {
    path: 'waiter',
    component: WaiterComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['waiter'] } 
  },
  {
    path: 'kitchen',
    component: WaiterComponent,
    canActivate: [AuthGuard],
   data: 
      { allowedRoles: ['kitchen'] } 
  }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'waiter-orders',
    component: WaiterComponent,
    canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
