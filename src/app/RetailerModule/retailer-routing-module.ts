import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesPersonsComponent } from './SalesPersons/salespersons.component';
import { ProductsComponent } from './Products/products.component';

const routes: Routes = [
  { path: "home", component: AdminHomeComponent },
  { path: "salesPersons", component: SalesPersonsComponent },
  { path: "products", component: ProductsComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


