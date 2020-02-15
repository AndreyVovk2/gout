import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class TermAndPrivacyProvider extends EntityProvider {

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);

    this.provider_name = 'terms';

  }

  getTerms(data: Object = null){
    const url = this.url('index');
    if(url){
      return this.request.get(url,data)
    }
  }



}

