import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FavoritesProvider} from "../../shared/providers/favorites.provider";

@IonicPage()

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favorites: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public favoritesProvider: FavoritesProvider) {
  }

  ionViewDidEnter(){
    this.getFavorites();
  }

  getFavorites(){
    this.favoritesProvider.getFavorites()
      .subscribe(success =>{
        console.log(success);
        this.favorites = success['data'];
        this.favorites.forEach(item =>{
          item.favorite = true;
        })
      })
  }

  reloadFavorites(event: string){
    if(event === 'false'){
      setTimeout(() => {
        this.getFavorites()
      }, 150);
    }
  }

}
