import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class RegisterProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'registration';
  }

  regUser(data: any ) {
      const url = this.url('register');
      if(this.credentialCheck(data)){
        return this.request.post(url, data)
      }
  }

  credentialCheck(data: any) {
    if (!data.name || !data.lastname || !data.email) {
      const msg = this.msg('empty');
      this.notification('error', msg);
      return false;
    }else if (!data.region_id) {
      const msg = this.msg('region');
      this.notification('error', msg);
      return false;
    } else {
      return true;
    }
  }

}
