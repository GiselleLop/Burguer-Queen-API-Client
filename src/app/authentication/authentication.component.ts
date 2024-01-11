import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Observable, Subscription } from 'rxjs';
import { Auth } from '../shared/interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private authService: AuthenticationServiceService) {}

  showPassword: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  email: string = '';
  password: string = '';
  private userData: Auth | undefined;
  errorMessage: string | null = null;
  //private accessToken: string = '';

  ngOnInit(): void {}

  //@Output() accessTokenEvent = new EventEmitter<string>()

  serviceLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
    {  next: (data) => {
      this.userData = data;

      //this.accessTokenEvent.emit(this.userData?.accessToken)
      console.log('Datos del usuario:', this.userData?.accessToken);
      console.log(data);
      this.authService.setUserRole(this.userData?.user.role);
      this.authService.redirectToRoleSpecificScreen();
      
    },
    error: (error) => {
      console.error('Error al obtener datos del usuario:', error);
      this.errorMessage = error.error
    }}
    );
  }
  passwordVisibility() {
    this.showPassword = !this.showPassword;
    this.eyeImageSource = this.showPassword
      ? '../../assets/images/show.png'
      : '../../assets/images/hide.png';
  }

}
