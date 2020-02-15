import {Injectable} from '@angular/core';

export declare interface business {
  myBusiness: Array<any>,
  businessHostes: Array<any>,
  businessPublicist: Array<any>
}

@Injectable()
export class MyBusinessProvider {


  public business: business = {
    myBusiness: [],
    businessHostes: [],
    businessPublicist: []
  };

  public userID: number = Number(localStorage.user_id);

  constructor() {
  }

  businessFilter(business) {
    this.business.myBusiness = [];
    this.business.businessHostes = [];
    this.business.businessPublicist = [];
    business.filter(item => {
      if (item.owner.id === this.userID) {
       this.business.myBusiness.push(item);
      } else {
        item.publicist.requested.filter(elem => {
          if(elem.id === this.userID){
            this.business.businessPublicist.push(item);
          }
        });
        item.hostes.requested.filter(elem => {
          if(elem.id === this.userID){
            this.business.businessHostes.push(item);
          }
        });
      }
    });
    this.business.businessPublicist = this.filterUnique(this.business.businessPublicist);
    this.business.businessHostes = this.filterUnique(this.business.businessHostes);
  }

  filterUnique(arr){
    let result = [];
    nextInput:
      for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        for (let j = 0; j < result.length; j++) { // ищем, был ли он уже?
          if (result[j].id == current.id) continue nextInput; // если да, то следующий
        }
        result.push(current);
      }
    return result;
  }

  setBusiness(data) {

  }

  getBusiness() {
    return this.business;
  }

}
