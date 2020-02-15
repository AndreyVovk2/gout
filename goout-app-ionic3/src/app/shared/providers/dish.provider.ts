import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {NotificationProvider} from "./notification.provider";

@Injectable()

export class DishProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'dish';
  }

  similarCheck(){
    const msg = this.msg('similar');
    this.notification('err',msg);
  }

  credentialCheck(data: any){
    if(!data.name || !data.price || !data.description){
      const msg = this.msg('empty');
      this.notification('err',msg);
      return false
    }else {
      return true
    }
  }

  create(data: any){
    const url = this.url('create');
    return this.request.post(url,data);
  }

  getAll(data: any){
    const url = this.url('all');
    return this.request.post(url,data);
  }


}
