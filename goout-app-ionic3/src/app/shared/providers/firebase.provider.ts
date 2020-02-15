import {Injectable} from "@angular/core";
import {Firebase} from "@ionic-native/firebase";
import {Platform} from "ionic-angular";
import {AngularFireDatabase} from "angularfire2/database"


@Injectable()
export class FirebaseProvider {

  userId: any;

  constructor(public firebaseNative: Firebase,
              public db: AngularFireDatabase,
              private platform: Platform){

  }

  saveUserToFirebase(user){
    if(!user) return;
    this.db.object('users/' + user.id).set(user)
      .then(res => {

      })
      .catch(err => {

      });
  }

  checkOnline(status: string,date: any){
    this.userId = localStorage.getItem('user_id');
    let data = {};
    if(date !== null){
      data = {
        status: status,
        date: date
      }
    } else {
      data = {
        status: status
      }
    }

    this.db.object('users/' + this.userId).update(data)
      .then(res => {

      })
      .catch(err => {

      });
  }

  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

}
