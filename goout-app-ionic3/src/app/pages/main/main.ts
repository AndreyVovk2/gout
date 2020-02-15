import {Component, OnInit} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {ActiveChatsPage} from "../active-chats/active-chats";
import {FriendsPage} from "../friends/friends";
import {UserProvider} from "../../shared/providers/user.provider";
import {BusinessProvider} from "../../shared/providers/business.provider";
import {PostProvider} from "../../shared/providers/post.provider";
import {business, MyBusinessProvider} from "../../shared/providers/my-business.provider";
import {FcmProvider} from "../../shared/providers/fcm.provider";
import {ToastController} from "ionic-angular";
import {tap} from "rxjs/internal/operators"
import {FavoritesProvider} from "../../shared/providers/favorites.provider";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@IonicPage({
  name: 'page-main',
  segment: 'page-main'
})
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public business: business = {
    myBusiness: [],
    businessHostes: [],
    businessPublicist: []
  };

  public user: any = {};
  public searchResult: any = [];
  public searchPosts: any = [];
  public allPosts: any = [];
  public favoritesList: any = [];
  public settingsSearch: boolean = false;
  public slice: number = 10;
  public activeSearch: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              private userProvider: UserProvider,
              private businessProvider: BusinessProvider,
              private postProvider: PostProvider,
              private myBusinessProvider: MyBusinessProvider,
              public fcm: FcmProvider,
              public toastCtrl: ToastController,
              public favoritesProvider: FavoritesProvider,
              private screenOrientation: ScreenOrientation) {
  }

  ionViewCanEnter() {
    this.getPosts();
    this.getMyBusiness();
    this.getUser();
  }

  ionViewDidLoad() {
    this.fcm.getToken();
    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present()
      })
    )
      .subscribe();
    // set to PORTRAIT screen Orientation
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  checkFavorites(data: any) {
    this.favoritesProvider.getFavorites()
      .subscribe(success => {
        this.favoritesList = success['data'];
        console.log(this.favoritesList);
        this.favoritesList.forEach(favorite => {
          data.forEach(post => {
            if (post.id === favorite.id) {
              post.favorite = true;
            }
          })
        });
      })
  }


  getMyBusiness() {
    this.businessProvider.getMy()
      .subscribe(success => {
        this.myBusinessProvider.businessFilter(success);
        this.business = this.myBusinessProvider.getBusiness();
      })
  }

  getPosts() {
    this.postProvider.getAll()
      .subscribe(success => {
        this.searchResult = this.navParams.get('post');
        this.searchPosts = success['data'];
        if (!this.searchResult) {
          this.allPosts = success['data'];
        } else this.allPosts = this.searchResult;
        this.checkFavorites(this.allPosts);
      })
  }

  getUser() {
    this.userProvider.getMe()
      .subscribe(success => {
        this.user = success;
        this.userProvider.setUser(success);
      });
  }

  postSearch(event) {
    this.allPosts = event;
  }

  getResult(ev) {
    console.log(ev);
    this.allPosts = ev;
  }

  searchState(event) {
    this.activeSearch = event;
  }

  searchChanged(increased: any) {
    increased == true ? this.settingsSearch = true : false;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 10;
      infiniteScroll.complete();
    }, 500);
  }

  btnEvent(value: string) {
    switch (value) {
      case 'active-chats':
        this.navCtrl.push(ActiveChatsPage, {user: this.user});
        break;
      case 'friends':
        this.navCtrl.push(FriendsPage, {type: "friend", user: this.user});
        break;
      case 'leftMenu':
        this.menuCtrl.toggle('left');
        break;
      case 'rightMenu':
        this.menuCtrl.toggle('right');
        break;
      case 'close':
        this.settingsSearch = false;
      default:
        console.log('The value = "' + value + '" is not valid for the btnEvent function');
    }
  }


}
