import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";
import {Network} from "@ionic-native/network";
import {ConstantHelperProvider} from "./base/constant-helper.provider";
import {AngularFireDatabase} from "angularfire2/database"
import {FirebaseProvider} from "./firebase.provider";

@Injectable()

export class ConnectionProvider extends ConstantHelperProvider {

  userId: any;

  constructor(public toast: ToastController,
              private network: Network,
              public firebase: FirebaseProvider) {
    super(toast);
    this.provider_name = 'connection'

  }

  startMonitoringConnection() {
    console.log("Connection");
    this.network.onConnect()
      .subscribe(() => {
        this.notification('success', this.msg('onConnect'));
    }, error => console.error(error));

    this.network.onDisconnect()
      .subscribe(() => {
        this.notification('error', this.msg('onDisconnect'));
    }, error => console.error(error));
  }

  getConnectionStatus (){
    let connectionStatus = navigator.onLine;
    if (!connectionStatus) {
      this.notification('error', this.msg('onDisconnect'));
    }
    return connectionStatus
  }

  checkOnline(){

  }
}
