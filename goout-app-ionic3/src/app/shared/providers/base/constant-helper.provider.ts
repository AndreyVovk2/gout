import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";
import {ConstantHelper} from "../../intefaces/constant-helper.interface";
import {COMMON_URL} from "../../constants/common.url";
import {COMMON_MSG} from "../../constants/common.messages";

@Injectable()

export class ConstantHelperProvider implements ConstantHelper {

  provider_name: string;

  constructor(public toastCtrl: ToastController) {
  }

  /**
   * Get url from COMMON URL FILE by action and service name
   * @param action
   * @returns {any}
   */

  url(action) {
    if (this.provider_name in COMMON_URL) {
      if (action in COMMON_URL[this.provider_name]) {
        return COMMON_URL[this.provider_name][action];
      }
    }
    return false;
  }

  /**
   * Get url from COMMON MSG FILE by action and service name
   * @param action
   * @returns {any}
   */

  msg(action) {
    if (this.provider_name in COMMON_MSG) {
      if (action in COMMON_MSG[this.provider_name]) {
        return COMMON_MSG[this.provider_name][action];
      }
    }
    return false;
  }

  /**
   * showing notification after create/update actions
   * @param type
   * @param message
   */

  notification(type, message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
