import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Retailer } from '../Models/retailer';


@Injectable({
  providedIn: 'root'
})
export class GreatOutdoorsDataService implements InMemoryDbService {
  constructor() { }

  createDb() {

    let retailers = [
      new Retailer(1, "401476EE-0A3B-482E-BD5B-B94A32355959", "Scott", "9876543210", "scott@capgemini.com", "Scott123#", "10/3/2019", "10/4/2019"),
      new Retailer(2, "C628855C-FE7A-4D94-A1BB-167157D3F4EA", "Smith", "9988776655", "smith@capgemini.com", "Smith123#", "9/6/2019", "5/7/2019"),
      new Retailer(3, "6D68849C-8FA8-4049-A111-B431C76C6548", "Arun", "7781994834", "arun@capgemini.com", "Arun123#", "1/5/2017", "15/11/2018"),
      new Retailer(4, "53E8748F-61D6-494B-BF72-E18B27511EFA", "Jones", "6989493491", "jones@capgemini.com", "Jones123#", "2/7/2019", "12/1/2019")
    ];



    let orders = [
     
    ];

    let orderdetails = [];

    return { retailers };
  }
}


