import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DishProvider} from "../../shared/providers/dish.provider";
import {NotificationProvider} from "../../shared/providers/notification.provider";

@IonicPage()

@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {

  public dishList: any = [];
  public dishCreate: any = {};
  public menuCategory: any = {};
  public state: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dishProvider: DishProvider,
              public notification: NotificationProvider,
              public loadingCtrl: LoadingController) {
    this.menuCategory = this.navParams.get('category');
    this.dishCreate = {
      name: '',
      price: '',
      description: '',
      menu_category_id: this.menuCategory.id
    };
    this.getDish();
    this.state = this.navParams.get('state')
  }

  getDish() {
    const data = {
      menu_category_id: this.menuCategory.id
    };
    this.dishProvider.getAll(data)
      .subscribe(success => {
        this.dishList = success;
      })
  }

  clearInputs() {
    this.dishCreate = {
      name: '',
      price: '',
      description: '',
      menu_category_id: this.menuCategory.id
    };
  }

  checkDish(){
    if(this.dishList){
     let check = this.dishList.some(item => item.name === this.dishCreate.name);
      if(check){
        this.dishProvider.similarCheck();
       return false
      } else {
        return true
      }
    }
  }

  addDish() {
    if(this.checkDish()){
      if(this.dishProvider.credentialCheck(this.dishCreate)){
        this.dishList.push(this.dishCreate);
        this.clearInputs()
      }
    }
  }

  createDish() {
    const data = {
      data: this.dishList
    };
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
    this.dishProvider.create(data).subscribe(success => {
      if (success['success'] === true) {
        this.notification.success(success['message']);
        this.navCtrl.pop()
      }
    })
  }

}
