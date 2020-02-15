import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class AuthProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'auth';

  }

  credentialsCheck(data: any) {
    if (!data.phone) {
      this.notification('error', 'מספר הטלפון שהוזן אינו תקין');
      return false;
    }
    if (data.phone.length !== 10) {
      this.notification('error',' מספר הטלפון שהוזן אינו תקין');
      return false;
    }
    return true;
  }


  send(data: any) {
    const url = this.url('send');
      return this.request.post(url, data)
        .do(() => {
            // const msg = this.msg('send');
            // this.notification('success', msg);
          },
          err => {
            // const msg = this.msg('err');
            // this.notification('error', msg)
          });
  }

  verify(data: any) {
    const url = this.url('verify');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('send');
          // this.notification('success', msg);
        },
        err => {
          const msg = this.msg('err');
          this.notification('error', msg)
        });
  }

}
