import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerHomeComponent } from './retailer-home/retailer-home.component';

const routes: Routes = [
  { path: "home", component: RetailerHomeComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule { }
