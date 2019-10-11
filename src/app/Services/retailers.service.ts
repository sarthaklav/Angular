import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Retailer } from '../Models/retailer';

@Injectable({
  providedIn: 'root'
})
export class RetailersService
{
 
  constructor(private httpClient: HttpClient)
  {

  }

  AddRetailer(retailer: Retailer): Observable<boolean>
  {
    retailer.creationDateTime = new Date().toLocaleDateString();
    retailer.lastModifiedDateTime = new Date().toLocaleDateString();
    retailer.retailerID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/retailers`, retailer);
  }

  UpdateRetailer(retailer: Retailer): Observable<boolean>
  {
    retailer.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/retailers`, retailer);
  }

  DeleteRetailer(retailerID: string, id: number): Observable<boolean>
  {
    return this.httpClient.delete<boolean>(`/api/retailers/${id}`);
  }

  GetAllRetailers(): Observable<Retailer[]>
  {
    return this.httpClient.get<Retailer[]>(`/api/retailers`);
  }

  GetRetailerByRetailerID(RetailerID: number): Observable<Retailer>
  {
    return this.httpClient.get<Retailer>(`/api/retailers?retailerID=${RetailerID}`);
  }

  GetRetailersByRetailerName(RetailerName: string): Observable<Retailer[]>
  {
    return this.httpClient.get<Retailer[]>(`/api/retailers?retailerName=${RetailerName}`);
  }

  GetRetailerByEmail(Email: string): Observable<Retailer>
  {
    return this.httpClient.get<Retailer>(`/api/retailers?email=${Email}`);
  }

  GetRetailerByEmailAndPassword(Email: string, Password: string): Observable<Retailer>
  {
    return this.httpClient.get<Retailer>(`/api/retailers?email=${Email}&password=${Password}`);
  }

  uuidv4()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
    {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



