export class Retailer {
  id: number;
  retailerID: string;
  retailerName: string;
  retailerMobile: string;
  email: string;
  password: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, RetailerID: string, RetailerName: string, RetailerMobile: string, Email: string, Password: string, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.retailerID = RetailerID;
    this.retailerName = RetailerName;
    this.retailerMobile = RetailerMobile;
    this.email = Email;
    this.password = Password;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}


