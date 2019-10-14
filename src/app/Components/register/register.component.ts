import { Component, OnInit } from '@angular/core';
import { Retailer } from '../../Models/retailer';
import { RetailersService } from '../../Services/retailers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { GreatOutdoorsComponentBase } from '../../greatOutdoors-component';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { User } from 'src/app/Models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-retailers',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends GreatOutdoorsComponentBase implements OnInit {
  newRetailerForm: FormGroup;
  newRetailerDisabled: boolean = false;
  newRetailerFormErrorMessages: any;


  constructor(private retailersService: RetailersService, private userAccountService: UserAccountService, private router: Router) {
    super();
    this.newRetailerForm = new FormGroup({
      retailerName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      retailerMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/)])
    });

    this.newRetailerFormErrorMessages = {
      retailerName: { required: "Retailer Name can't be blank", minlength: "Retailer Name should contain at least 2 characters", maxlength: "Retailer Name can't be longer than 40 characters" },
      retailerMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
      email: { required: "Email can't be blank", pattern: "Email is invalid" },
      password: { required: "Password can't be blank", pattern: "Password should contain should be between 6 to 15 characters long, with at least one uppercase letter, one lowercase letter and one digit" }
    };
  }

  ngOnInit() {

  }

  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }



  onAddRetailerClick(event) {
    this.newRetailerForm["submitted"] = true;
    if (this.newRetailerForm.valid) {
      this.newRetailerDisabled = true;
      var retailer: Retailer = this.newRetailerForm.value;

      this.retailersService.AddRetailer(retailer).subscribe((addResponse) => {
        
        this.newRetailerDisabled = false;
        //this.showRetailersSpinner = true;

        this.retailersService.GetRetailerByEmailAndPassword(retailer.email, retailer.password).subscribe((newResponse) => {
          this.userAccountService.currentUser = new User(retailer.email, retailer.retailerName);
          this.userAccountService.currentUserType = "Retailer";
          this.userAccountService.currentUserId = newResponse[0].retailerId;
          this.userAccountService.isLoggedIn = true;
          this.router.navigate(["/retailer", "home"]);
        });

        

      },
        (error) => {
          console.log(error);
          this.newRetailerDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newRetailerForm);
    }
  }


}
