import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BusinessProvider} from "../../shared/providers/business.provider";
import {NewBusinessPage} from "../new-business/new-business";
import {NewLinePage} from "../new-line/new-line";
import {MyLinesPage} from "../my-lines/my-lines";
import {NotificationProvider} from "../../shared/providers/notification.provider";

@IonicPage()
@Component({
  selector: 'page-my-business',
  templateUrl: 'my-business.html',
})
export class MyBusinessPage {

  private business: any = [];
  private myBusiness: any = [];
  private state: string;
  private title: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private businessProvider: BusinessProvider,
              public notification: NotificationProvider) {


  }

  ionViewDidEnter() {
    this.getMyBusiness();

  }

  getMyBusiness() {
    this.state = this.navParams.get('state');
    console.log(this.state);
    this.getState(this.state);
    if (this.state ==="myBusiness") {
      this.businessProvider.getMy()
        .subscribe(success => {
          this.business = success;
          let userId = +localStorage.getItem('user_id');
          this.myBusiness = this.business.filter(item => {
            if (item.owner.id === userId) {
              return item;
            }
          })
        })
    } else {
      this.myBusiness = this.navParams.get('business');
    }
  }

  getState(data: string) {
    switch (data) {
      case "myBusiness":
        this.title = 'העסקים שלי';
        break;
      case "businessHostes":
        this.title = 'העסקים שלי';
        break;
      case "businessPublicist":
        this.title = 'העסקים שלי';
        break;
    }
  }

  toLines(data: any) {
    this.myBusiness.forEach(item => {
      if (item.id == data) {
        if (item.lines.length) {
          this.navCtrl.push(MyLinesPage, {business_id: item.id, state: this.state,business_name: item.name});
        } else if(this.state === 'myBusiness'){
          this.navCtrl.push(NewLinePage, {business_id: item.id, state: "create"});
        } else {
          this.notification.error('This business not have lines')
        }
      }
    })
  }

  editBusiness(business: any) {
    this.navCtrl.push(NewBusinessPage, {state: "edit", business: business})
  }

  addBusiness() {
    this.navCtrl.push(NewBusinessPage, {state: "create"});
  }


}
