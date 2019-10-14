import { Component, OnInit } from '@angular/core';
import { Retailer } from 'src/app/Models/Retailer';
import { RetailersService } from 'src/app/Services/retailers.service';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";


@Component({
  selector: 'app-retailer-home',
  templateUrl: './retailer-home.component.html',
  styleUrls: ['./retailer-home.component.scss']
})

export class RetailerHomeComponent implements OnInit {


  retailer: Retailer = null;


  changePasswordForm: FormGroup;
  editpasswordDisabled: boolean = false;
  changePasswordFormErrorMessages: any;

  editRetailerForm: FormGroup;
  editRetailerDisabled: boolean = false;
  editRetailerFormErrorMessages: any;
  currentRetailer = this.userAccountService.currentUser;

  constructor(private userAccountService: UserAccountService, private retailersService: RetailersService) {

    this.changePasswordForm = new FormGroup({
      id: new FormControl(null),
      retailerID: new FormControl(null),
      retailerName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      retailerMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/)])

    });

    this.changePasswordFormErrorMessages = {
      password: { required: "Password can't be blank", pattern: "Password should contain should be between 6 to 15 characters long, with at least one uppercase letter, one lowercase letter and one digit" },

    };


    this.editRetailerForm = new FormGroup({
      id: new FormControl(null),
      retailerID: new FormControl(null),
      retailerName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      retailerMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    });

    this.editRetailerFormErrorMessages = {
      retailerName: { required: "Retailer Name can't be blank", minlength: "Retailer Name should contain at least 2 characters", maxlength: "Retailer Name can't be longer than 40 characters" },
      retailerMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
   
    };
  }

  ngOnInit() {

    this.retailer = this.retailersService.currentRetailer;
    console.log(this.retailer);

  }


  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.changePasswordFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }


  onChangePasswordClick() {
    this.changePasswordForm.reset();
    this.changePasswordForm["submitted"] = false;
    this.changePasswordForm.patchValue({
      id: this.retailer.id,
      retailerID: this.retailer.retailerID,
      retailerName: this.retailer.retailerName,
      retailerMobile: this.retailer.retailerMobile,
      email: this.retailer.email,
      password: this.retailer.password
  

    });
  }

  onUpdatePasswordClick(event) {
    this.changePasswordForm["submitted"] = true;
    if (this.changePasswordForm.valid) {
      this.editpasswordDisabled = true;
      var retailer: Retailer = this.changePasswordForm.value;

      this.retailersService.UpdateRetailer(retailer).subscribe((updateResponse) => {
        this.changePasswordForm.reset();
        console.log(updateResponse);
        $("#btnchngePasswordCancel").trigger("click");
        this.editpasswordDisabled = false;


        alert("Password updated successfully!");
      },
        (error) => {
          console.log(error);
          this.editpasswordDisabled = false;
        });
    }

  }


  onEditRetailerClick(index) {
    this.editRetailerForm.reset();
    this.editRetailerForm["submitted"] = false;
    this.editRetailerForm.patchValue({
      id: this.retailer.id,
      retailerID: this.retailer.retailerID,
      retailerName: this.retailer.retailerName,
      retailerMobile: this.retailer.retailerMobile,
      email: this.retailer.email,
      password: this.retailer.password
   

    });
  }

  onUpdateRetailerClick(event) {
    this.editRetailerForm["submitted"] = true;
    if (this.editRetailerForm.valid) {
      this.editRetailerDisabled = true;
      var retailer: Retailer = this.editRetailerForm.value;

      this.retailersService.UpdateRetailer(retailer).subscribe((updateResponse) => {
        this.editRetailerForm.reset();
        $("#btnUpdateRetailerCancel").trigger("click");
        this.editRetailerDisabled = false;

        console.log(this.retailer.email, this.retailer.password);
        this.retailersService.GetRetailerByEmailAndPassword(retailer.email, retailer.password).subscribe((getResponse: any) => {

          if (getResponse.length > 0)
            this.retailer = getResponse[0];

          //console.log(this.retailer.);
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editRetailerDisabled = false;
        });
    }

  }

}
