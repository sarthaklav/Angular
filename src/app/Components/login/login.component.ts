import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from '../../Services/user-account.service';
import { User } from '../../Models/user';
import { RetailersService } from 'src/app/Services/retailers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalidLogin: boolean = false;

  constructor(private userAccountService: UserAccountService, private router: Router, private retailerService: RetailersService) {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null),
        password: new FormControl(null)
      });
  }

  ngOnInit() {
  }

  onLoginClick() {
    this.userAccountService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
      if (response != null && response.length > 0) {
        console.log(response);
        this.userAccountService.currentUser = new User(this.loginForm.value.email, response[0].retailerName);
        this.userAccountService.currentUserType = "Retailer";

        this.retailerService.currentRetailer = response[0];
        this.userAccountService.isLoggedIn = true;
        this.router.navigate(["/retailer", "home"]);
      }
      else {
        this.isInvalidLogin = true;
      }
    }, (error) => {
        console.log(error);
      });
  }
}
