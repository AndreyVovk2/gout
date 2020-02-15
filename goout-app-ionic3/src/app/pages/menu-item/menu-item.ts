import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {MenuProvider} from "../../shared/providers/menu.provider";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {COMMON_MSG} from "../../shared/constants/common.messages";
import {BusinessProvider} from "../../shared/providers/business.provider";

@IonicPage()

@Component({
  selector: 'page-menu-item',
  templateUrl: 'menu-item.html',
})
export class MenuItemPage {
  IdBusiness: any;
  public header: string = '';
  public menuCategory: any = {

    business_id: ''
  };
  idEvents: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuProvider: MenuProvider,
              private loadingCtrl: LoadingController,
              private notification: NotificationProvider,
              private businessProvider: BusinessProvider,

  ) {
  }

  ionViewDidEnter() {
    this.getIdEnvents()
  }

  getIdEnvents() {
    this.IdBusiness = this.businessProvider.idBusiness;
    console.log(this.IdBusiness)
  }

  getMenuPhoto(event: string) {
    this.menuCategory.photo = event;
  }

  createMenuCategory() {

    if (!this.menuCategory.name || !this.menuCategory.photo) {
      this.notification.error(COMMON_MSG.select_photo.empty)
    } else {
      this.menuCategory.business_id = this.IdBusiness;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
      this.menuProvider.create(this.menuCategory)
        .subscribe(success => {
          if (success['success']) {
            this.navCtrl.pop()
          }else {this.notification.error(success['message'])}
        },message => {
          console.log(message)
        })
    }

  }

}
