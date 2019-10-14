import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RetailerHomeComponent } from './retailer-home/retailer-home.component';
import { RetailerRoutingModule } from './retailer-routing.module';

@NgModule({
  declarations: [
    RetailerHomeComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RetailerRoutingModule
  ],
  exports: [
    RetailerRoutingModule,
    RetailerHomeComponent
  ]
})
export class RetailerModule { }
