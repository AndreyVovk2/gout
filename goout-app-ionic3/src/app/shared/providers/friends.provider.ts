import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class FriendsProvider extends EntityProvider {

  constructor(public request: RequestProvider,
              public toast: ToastController) {
    super(request, toast)
  }


  filterPhone(number, cityNumbers: boolean = false) {
    //1 Remove unnecessary characters
    let numberFiltered  = number.split('-').join('');
    numberFiltered = numberFiltered.split(' ').join('');

    //2 Check for a country index
    let countryIndex = numberFiltered.slice(0, 3);

    if (!(countryIndex.indexOf('+') === -1)){
      if (countryIndex === '+38'){
        numberFiltered = numberFiltered.slice(3)
      } else {
        numberFiltered = false
      }
    }

    if (cityNumbers){
      //3 Add a city index
      if (numberFiltered.length < 5 || numberFiltered.length > 10){
        numberFiltered = false
      } else if (numberFiltered.length === 5) {
        numberFiltered = numberFiltered = '05322' + numberFiltered;
      } else if (numberFiltered.length === 6) {
        numberFiltered = numberFiltered = '0532' + numberFiltered;
      }
    } else {
      if (numberFiltered.length != 10){
        numberFiltered = false
      }
    }





    return numberFiltered;

  }

  filterSendPhones(phones: any[] = []) {
    let filteredPhones = phones.filter((phone)=>{
      if (phone.slice(0, 3) === '066'){
        return true
      }
    });

    return filteredPhones;

  }




}
