import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class NotificationProvider extends EntityProvider {

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);

    this.provider_name = 'notification';

  }

  error(err){
    this.notification('error', err);
  }

  success(success){
    this.notification('success',success);
  }

}

