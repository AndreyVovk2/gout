import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class SubBusinessProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'subBusiness';
  }

  getAll(data: Object = null){
    const url = this.url('all');
    return this.request.get(url,data);
  }
}
