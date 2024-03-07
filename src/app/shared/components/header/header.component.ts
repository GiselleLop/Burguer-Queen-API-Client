import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication/authentication-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutModalComponent } from 'src/app/components/logout-modal/logout-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService, private router: Router, public dialog: MatDialog ) { }


  ngOnInit(): void {
  }

  openLogoutConfirmationModal(): void {
    const dialogRef = this.dialog.open(LogoutModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Cerrar Sesión') {
        this.authService.clearUserRole();
        this.authService.clearToken();
        this.router.navigate(['/login']);
      } 
    });
  }
}
