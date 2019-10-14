import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { GreatOutdoorsDataService } from './InMemoryWebAPIServices/greatOutdoors-data.service';
import { RetailerModule } from './RetailerModule/retailer.module';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    environment.production ? HttpClientInMemoryWebApiModule.forRoot(GreatOutdoorsDataService, { delay: 1000 }) : [],
    RetailerModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

