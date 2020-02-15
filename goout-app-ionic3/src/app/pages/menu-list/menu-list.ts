import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuItemPage} from "../menu-item/menu-item";
import {MenuProvider} from "../../shared/providers/menu.provider";
import {DishPage} from "../dish/dish";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()

@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuListPage {

  public menuCategories: any = [];
  public businessId: any = '';
  public state: string;
  public headerTitle: string = '';
public IdEvents: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuProvider: MenuProvider,
              public translate: TranslateService) {
    this.headerTitle = this.translate.instant('menu-list.title');
    this.businessId = this.navParams.get('business_id');
    this.IdEvents = this.navParams.get('idEvent');
    this.getMenu();
  }

  ionViewCanEnter(){
    this.state = this.navParams.get('state');
    this.getMenu();

    console.log(this.IdEvents)
  }

  getMenu(){
    const data = {
      business_id: this.businessId
    };
    this.menuProvider.getAll(data)
      .subscribe( success => {
        console.log(success);
        if (success['success'] !== false) {
          this.menuCategories = success;
        }
      });
  }

  toDish(id: number,photo: string){
    const data = {
      id: id,
      photo: photo
    };
    this.navCtrl.push(DishPage, {category: data,state: this.state})
  }

  addCategoryMenu(){
    this.navCtrl.push(MenuItemPage,{business_id: this.businessId})
  }
}
