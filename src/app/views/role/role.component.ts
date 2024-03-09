import { Component, OnInit} from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
// import { KitchenServiceService } from 'src/app/services/kitchen/kitchen-service.service';
// import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  userRole: any = ''
  

  constructor(private authenticationService: AuthenticationServiceService) {
  this.userRole = authenticationService.getUserRole()
  }

  ngOnInit(): void {
  }
  

}
