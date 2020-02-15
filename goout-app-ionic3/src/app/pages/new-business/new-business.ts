import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BusinessProvider} from "../../shared/providers/business.provider";
import {SubBusinessProvider} from "../../shared/providers/sub-business.provider";
import {MapsAPILoader} from "@agm/core";
import {} from "googlemaps";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {FriendsPage} from "../friends/friends";
import {MenuListPage} from "../menu-list/menu-list";
import {FacebookProvider} from "../../shared/providers/facebook.provider";
import {UserProvider} from "../../shared/providers/user.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {RegionProvider} from "../../shared/providers/region.provider";
import {NotificationsPage} from "../notifications/notifications";

@IonicPage()

@Component({
  selector: 'page-new-business',
  templateUrl: 'new-business.html',
})
export class NewBusinessPage {

  public title: string;
  public business: any = {};
  public subBusinessCategory: any = [];
  public businessCategory: any = [];
  public selectCategory: any;
  public selectSubCategory: any;
  public filterForCategories: any = [];
  public friends: any = [];
  public hostess: any = [];
  public blogger: any = [];

  public categoryName: string;
  public subCategoryName: string;

  public state: string;
  public photo: any;

  public regions: any = [];

  public newBusinessId: number = 0;

  public menuBtn: boolean = false;

  public access: boolean = false;

  public popups: any = {};

  public unsubscribe: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mapsAPILoader: MapsAPILoader,
              private businessProvider: BusinessProvider,
              private subBusinessProvider: SubBusinessProvider,
              private notification: NotificationProvider,
              private loadingCtrl: LoadingController,
              public events: Events,
              private facebookProvider: FacebookProvider,
              private userProvider: UserProvider,
              private sanitizer: DomSanitizer,
              private regionProvider: RegionProvider) {
    this.state = this.navParams.get('state');
    this.getRegion();
    if (this.state === "create") {
      this.business = {
        name: '',
        location: '',
        latitude: '',
        longitude: '',
        business_category_id: null,
        sub_business_category_id: null
      };
      this.title = ' פתיחת עסק חדש'
    } else {
      this.getDataUpdate();
      this.title = 'עריכת עסק'
    }
    this.events.subscribe('access', data => {
      this.access = data;
      console.log(this.access);
    })
  }

  getDataUpdate() {
    const data = this.navParams.get('business');
    console.log(data);
    this.newBusinessId = data.id;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(data.photo);

    this.business.business_id = data.id;
    this.business.name = data.name;
    this.business.location = data.location;
    this.business.latitude = data.latitude;
    this.business.longitude = data.longitude;

    this.categoryName = data.business_category;
    this.subCategoryName = data.sub_business_category;
    setTimeout(() => {
      this.regions.forEach(item => {
        if (item.name == data.business_region_id && this.regions != []) {
          this.business.business_region_id = item.id;
        }
      });
    }, 300);

  }

  ionViewCanEnter() {
    this.getRegion();
    if (this.state === 'edit') {
      this.getDataUpdate();
    }
    this.getBusinessCategory();
    this.getSubBusinessCategory();
  }

  ionViewDidLoad() {
    this.getLocation();
    this.mapsAPILoader = require('google-maps');
    console.log('im view busines');
    this.setRoles();
    this.getAccessToken();
    this.filterUpdateFriend();
  }

  getPhoto(event: string) {
    this.business.photo = event;
  }

  getPopupData(data: any, state: string) {
    switch (state) {
      case 'category':
        this.filterCat(data.id);
        this.selectCategory = data.name;
        this.selectSubCategory = '';
        this.business.business_category_id = data.id;
        this.popups.businessCategory = false;
        break;
      case 'subCategory':
        this.selectSubCategory = data.name;
        this.business.sub_business_category_id = data.id;
        this.popups.subBusinessCategory = false;
        break;
    }
  }

  showPopup(state: string, event: any) {
    event.stopPropagation();
    if (this.popups.businessCategory || this.popups.subBusinessCategory) {
      this.popups = {
        businessCategory: false,
        subBusinessCategory: false
      };
    } else {
      switch (state) {
        case 'businessCategory':
          this.popups.businessCategory = true;
          break;
        case 'subBusinessCategory':
          this.popups.subBusinessCategory = true;
          break;
      }
    }
  }

  /* Function for getting business categories*/
  getBusinessCategory() {
    let getAll = this.businessProvider.getAll()
      .subscribe(success => {
        this.businessCategory = success;
        console.log(this.businessCategory);
        if (this.state === 'edit') {
          this.businessCategory.filter(item => {
            if (item.name === this.categoryName) {
              this.selectCategory = this.categoryName;
              this.business.business_category_id = item.id;
              console.log(this.businessCategory);
            }
          });
        }
      });
    this.unsubscribe.push(getAll)
  }

  /* Function for getting subbusiness categories*/
  getSubBusinessCategory() {
    let getAll = this.subBusinessProvider.getAll()
      .subscribe(success => {
        this.subBusinessCategory = success;
        if (this.state === 'edit') {
          if (this.subBusinessCategory.length) {
            this.subBusinessCategory.filter(item => {
              if (item.name === this.subCategoryName) {
                this.selectSubCategory = this.subCategoryName;
                this.business.sub_business_category_id = item.id;
                this.filterCat(this.business.business_category_id);
              }
            });
          }
        }
      }, err => {
      });
    this.unsubscribe.push(getAll)
  }

  filterCat(event: any) {
    if (event == '1' || event == '3') {
      this.menuBtn = true;
    } else {
      this.menuBtn = false
    }
    this.filterForCategories = [];
    this.subBusinessCategory.forEach(item => {
      if (item.business_category_id === event) {
        this.filterForCategories.push(item);
        console.log(this.filterForCategories);
      }
    });
  }

  getRegion() {
    let region = this.regionProvider.getAll()
      .subscribe(success => {
        this.regions = success;
      });
    this.unsubscribe.push(region)
  }

  /* Autocomplete */
  getLocation() {
    this.mapsAPILoader.load().then(() => {

      const input = document.getElementById('pac-input');

      const options = {
        componentRestrictions: {country: 'il'}
      };

      const autocomplete = new google.maps.places.Autocomplete(input as HTMLInputElement, options);

      autocomplete.addListener('place_changed', () => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        if (!place.geometry) {
          this.business.location = place.name;
          return;
        }
        console.log(place);
        this.business.location = place.formatted_address;
        this.business.latitude = place.geometry.location.lat();
        this.business.longitude = place.geometry.location.lng();

        /** set region */
        let regiones = place.address_components;
        console.log(regiones);
        for (let i in regiones) {
          if (regiones[i]['types'][0] === 'administrative_area_level_1') {
            this.regions.forEach(item => {
              if (item.name === regiones[i]['long_name']) {
                this.business.business_region_id = item.id;
              }
            })
          }
        }
        if (!this.business.business_region_id) {
          this.notification.success('Please select a different region')
        }
      });
    });
  }

  /* Function for ionic-select, change category*/

  toMenu() {
    this.navCtrl.push(MenuListPage, {business_id: this.newBusinessId})
  }

  /* Function for create busniess */
  createBusiness(way: string) {
    if (this.businessProvider.credentialCheck(this.business, 'create')) {
      if (this.access) {
        if (this.businessProvider.credentialCheck(this.business, 'create')) {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            enableBackdropDismiss: true
          });
          loading.present();
          console.log(this.business);
          let business = this.businessProvider.createBusiness(this.business)
            .subscribe(success => {
                this.notification.success(success['message']);
                if (success['success'] === true) {
                  if (way === 'menu') {
                    this.newBusinessId = success['data']['id'];
                    this.navCtrl.push(MenuListPage, {business_id: this.newBusinessId, state: "edit"});
                    loading.dismiss();
                  } else {
                    this.navCtrl.pop();
                    loading.dismiss();
                  }
                }
              }
            );
          this.unsubscribe.push(business)
        }
      } else {
        this.navCtrl.push(NotificationsPage)
      }
    }
  }

  updateBusiness() {
    if (this.state === 'create') {
      this.navCtrl.pop()
    } else {
      if (this.businessProvider.credentialCheck(this.business, 'edit')) {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
          loading.dismiss();
        }, 2000);
        console.log(this.business);
        let business = this.businessProvider.updateBusiness(this.business)
          .subscribe(success => {
            this.notification.success(success['message']);
            if (success['success'] === true) {
              this.navCtrl.pop();
            }
          });
        this.unsubscribe.push(business)
      }
    }
  }

  closePopup() {
    this.popups = {
      businessCategory: false,
      subBusinessCategory: false
    };
  }


  /** Role section **/

  addRole(role: string) {
    console.log(this.business);
    switch (role) {
      case 'blogger':
        console.log('blogger1');
        this.navCtrl.push(FriendsPage, {
          type: "blogger",
          chosenRoles: this.business.publicist_id,
          friends: this.friends
        });
        break;
      case 'hostess':
        console.log('hostess2');
        this.navCtrl.push(FriendsPage, {type: "hostess", chosenRoles: this.business.hostes_id, friends: this.friends});
        break;
    }
  }

  setRoles() {
    this.events.subscribe('select:role', (roleID, typeRole) => {
      switch (typeRole) {
        case 'blogger':
          if (!this.business.publicist_id) {
            this.business.publicist_id = []
          }
          this.business.publicist_id.push(roleID);
          break;
        case 'hostess':
          if (!this.business.hostes_id) {
            this.business.hostes_id = []
          }
          this.business.hostes_id.push(roleID);
          break;
      }
      this.filterFriend();
    });
  }

  getAccessToken() {
    this.facebookProvider.getLoginStatus()
      .then((res) => {
        console.log(res.authResponse.accessToken);
        this.getFBFriends(res.authResponse.accessToken);
      })
      .catch((err) => console.log(err));
    let accessToken = 'EAAG4OEqQeHUBANOuOWFBxyzPkiX89r1aq1S4TqUgPmvOnSO4kvayXnpjynU2wcBIrAy50QxWgEsDu3ZA32cHNWkI0cBgIv9fKqqwjMMEsqhJhvZCZCAn0vfvvAqaYpudMhEPwAeKhDPn2zetALGKmGZCwE4hcZBviZBuf7NeZC8hNwZCg80VmRxRcNnVuM9JZBsfDHOXnsCpY7xumNmcZBqYpJmRWlrQhamyQK7WRPF3sXe1bZBA2Nu7XgmlrPme9UvWgYZD'
    this.getFBFriends(accessToken)
  }

  getFBFriends(accessToken) {
    let data = {access_token: accessToken};
    this.userProvider.getFbFriends(data)
      .subscribe(success => {
        console.log(success);
        this.friends = JSON.parse(JSON.stringify(success));
        this.filterFriend();
      });
  }

  filterSendStatusFriend() {

    const data = this.navParams.get('business');

    if (data) {

      let hostessAceeptedId = data.hostes.accepted;
      let publicistAceeptedId = data.publicist.accepted;
      // let hostessAceeptedId = [12];
      // let publicistAceeptedId = [14];

      console.log(this.hostess, this.blogger);

      for (let i in publicistAceeptedId) {
        for (let h in this.blogger) {
          if (this.blogger[h].id === publicistAceeptedId[i]) {
            this.blogger[h].status_send = true;
          }
        }
      }

      for (let i in hostessAceeptedId) {
        for (let h in this.hostess) {
          if (this.hostess[h].id === hostessAceeptedId[i]) {
            this.hostess[h].status_send = true;
          }
        }
      }
    }
  }

  filterFriend() {
    this.blogger = [];
    this.hostess = [];
    for (let i in this.friends) {
      let friend = JSON.parse(JSON.stringify(this.friends[i])); //untie the array
      for (let i in this.business.publicist_id) {
        if (this.business.publicist_id[i] == friend.id) {
          this.blogger.push(friend);
        }
      }
    }

    for (let i in this.friends) {
      let friend = JSON.parse(JSON.stringify(this.friends[i]));
      for (let i in this.business.hostes_id) {
        if (this.business.hostes_id[i] == friend.id) {
          this.hostess.push(friend);
        }
      }
    }

    this.filterSendStatusFriend()
  };

  filterUpdateFriend() {
    if (this.state === 'edit') {
      const data = this.navParams.get('business');
      let hostess = data.hostes.requested;
      let publicist = data.publicist.requested;

      for (let i in hostess) {
        if (!this.business.hostes_id) {
          this.business.hostes_id = []
        }
        ;
        this.business.hostes_id.push(hostess[i]['id']);
      }
      ;
      for (let i in publicist) {
        if (!this.business.publicist_id) {
          this.business.publicist_id = []
        }
        ;
        this.business.publicist_id.push(publicist[i]['id']);
      }
      ;
    }
  }

  ionViewDidLeave() {
    for (let i = 0; i < this.unsubscribe.length; i++) {
      this.unsubscribe[i].unsubscribe()
    }
  }


}
