import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class MenuProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'menu';
  }

  create(data: any) {
    const url = this.url('create');
    return this.request.post(url, data);
  }

  getAll(data: any) {
    const url = this.url('all');
    return this.request.post(url, data);
  }


}
