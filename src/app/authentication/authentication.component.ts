import { Component, OnInit  } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication/authentication-service.service';
import { Auth, userInterface } from '../shared/interfaces/interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit  {

  constructor(private authService: AuthenticationServiceService) {}

  showPassword: boolean = false;
  eyeImageSource: string = '../../assets/images/hide.png';
  email: string = '';
  password: string = '';
  private userData: Auth | undefined;
 // private userData: userInterface | undefined;
// private profiles: userInterface | undefined;
  userRole: string | undefined;
  errorMessage: string | null = null;
  roleUser: string | undefined = ''
  ngOnInit(): void {
  }

  serviceLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
    {  next: (data) => {
      console.log(data, ' data component');
      //this.profiles = data
      //this.profiles.find(profile => profile.email === email && profile.password === password);
     // const profilefound = t.find(profile => profile.email === this.email && profile.password === this.password);

  // for (const user of data) {
  //   if (user.email === this.email || user.password === this.password) {
  //     this.userData = data;
  //   }
  //}
     this.userData = data;
    // console.log(this.userData?.user.role, ' data component');
      
     this.roleUser = this.userData?.user.role
      this.authService.setUserRole(this.roleUser);
      this.authService.redirectToRoleSpecificScreen();
      this.authService.getToken(this.userData?.accessToken)
    },
    error: (error) => {
      console.log(error);
      
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
