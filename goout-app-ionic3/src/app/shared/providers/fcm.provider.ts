import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Firebase} from "@ionic-native/firebase";
import {Platform, ToastController} from "ionic-angular";
import {AngularFireDatabase} from "angularfire2/database"
import {locale} from "moment";
import {EntityProvider} from "./base/entity.provider";
import {RequestProvider} from "./request.provider";


@Injectable()
export class FcmProvider extends EntityProvider{

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController,
              public firebaseNative: Firebase,
              public db: AngularFireDatabase,
              private platform: Platform){
    super(request, toast);
    this.provider_name = 'fcm'
  }

  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken()
    }
    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    if(!this.platform.is('browser')){
      token = await this.firebaseNative.getToken()
    }
    return this.saveTokenToFirebase(token);
  }

  private saveTokenToFirebase(token){
    if(!token) return;
    const devicesRef = this.db.object('devices/' + localStorage.user_id);

    const docData = {
      token,
      userID: localStorage.user_id
    };
    const deviceToken = {
      device_id: token
    };

    this.getTokenDevice(deviceToken)
      .subscribe( success => {
        console.log(success);
      });

    return devicesRef.set(docData)
  }

  getTokenDevice(token){
    const url = this.url('subscribe');
    return this.request.post(url,token)
  }



  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

}
