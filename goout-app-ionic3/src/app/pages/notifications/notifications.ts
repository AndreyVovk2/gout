import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public access: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events) {
  }

  confirmAccess(){
    this.events.publish('access', this.access);
    this.navCtrl.pop()
  }


}
