import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RegionProvider} from "../../shared/providers/region.provider";
import {UserProvider} from "../../shared/providers/user.provider";
import {RegisterProvider} from "../../shared/providers/register.provider";
import {MainPage} from "../main/main";
import moment from 'moment'
import {CameraProvider} from "../../shared/providers/camera.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {BusinessProvider} from "../../shared/providers/business.provider";
import {FirebaseProvider} from "../../shared/providers/firebase.provider";
import {COMMON_MSG} from "../../shared/constants/common.messages";

@IonicPage({
  name: 'page-profile',
  segment: 'page-profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: './profile.html',
})

export class ProfilePage {

  @ViewChild('picker') picker;
  public state: any;
  public monthName: any = [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר'
  ];

  public regions: any = [];
  public businessCategory: any = [];
  public data: any = {};
  public filterRegions: any = [];
  public filterBusiness: any = [];
  public userInfo: any = {};
  public user: any = {};

  public profilePicker: boolean = false;

  public avatar_image: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private regionProvider: RegionProvider,
              private userProvider: UserProvider,
              private registerProvider: RegisterProvider,
              private loadingCtrl: LoadingController,
              private actionCtrl: ActionSheetController,
              private cameraProvider: CameraProvider,
              private sanitaizer: DomSanitizer,
              private notificationProvider: NotificationProvider,
              private businessProvider: BusinessProvider,
              private firebaseProvider: FirebaseProvider) {

    this.state = this.navParams.get('state');
    console.log(this.state);

  }

  /* Getting user*/
  ionViewDidLoad() {
    console.log(this.avatar_image);
    this.getRegion();
    this.getBusinessCategory();
    this.getUser();
    if (this.state === 'settings') {
      this.profilePicker = true;
    }
  }

  getUser() {
    this.userInfo = this.userProvider.getUser();
    for (const props in this.userInfo) {
      if (this.userInfo.hasOwnProperty(props)) {
        this.user[props] = this.userInfo[props];
      }
    }
    if (this.state === 'settings') {
      this.user.birthday = this.user.birthday.substr(-4) + '-' + this.user.birthday.substr(3, 2) + '-' + this.user.birthday.substr(0, 2);
    } else {
      this.user.birthday = moment(this.user.birthday).format('YYYY-MM-DD')
    }
    console.log('user', this.user);
  }

  /* Function for getting state of picker, for styling*/
  openPicker() {
    if (this.state === 'second') {
      this.picker.open();
      this.picker._picker.setCssClass("auth-picker");
    }
  }

  getBusinessCategory() {
    this.businessProvider.getAll()
      .subscribe(success => {
        this.businessCategory = success;
        for (let i = 0; i < this.businessCategory.length; i++) {
          this.businessCategory[i].checked = false;
        }
      })
  }

  /* Function for getting regions */
  getRegion() {
    this.regionProvider.getAll()
      .subscribe(success => {
        this.regions = success;
        for (let i = 0; i < this.regions.length; i++) {
          this.regions[i].checked = false;
        }
      });
  }

  /** Function for router to region from profile-edit **/
  toRegion() {
    if (this.user.business_category_id === '') {
      alert('hello')
    }
    this.state = 'region';
    //loop for user's regions
    this.regions.forEach(region => {
      this.userInfo.region_id.forEach(user_region => {
        if (region.id === user_region) {
          region.checked = true;
        }
      })
    });
    this.businessCategory.forEach(category => {
      this.userInfo.business_category_id.forEach(user_category => {
        if (category.id === user_category) {
          category.checked = true;
        }
      })
    });
    console.log(this.state);
  }

  /* Function for change user's avatar*/
  getAvatar() {
    let actionSheet = this.actionCtrl.create({
      cssClass: "modal-camera",
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.cameraProvider.getMedia(2)
              .then(res => {
                if (typeof res !== 'undefined') {
                  console.log(res);
                  this.avatar_image = this.sanitaizer.bypassSecurityTrustResourceUrl(res);
                  this.user.avatar_src = res;
                }
              })
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.cameraProvider.getMedia(1)
              .then(res => {
                if (typeof res !== 'undefined') {
                  this.avatar_image = this.sanitaizer.bypassSecurityTrustResourceUrl(res);
                  this.user.avatar_src = res;
                }
              })
          }
        }
      ]
    });
    actionSheet.present();
  }


  /* Function for registration user*/
  saveUser() {

    if (this.data.business_category_id === '') {
      alert('hello');
      console.log('hello')

    }
    debugger
    if (this.state === 'first') {
      if (!this.user.name || !this.user.lastname || !this.user.email) {
        this.notificationProvider.error(COMMON_MSG.registration.empty);
        return;
      }
      this.state = 'second';
    } else if (this.state === 'second') {
      if (!this.user.gender || !this.user.birthday) {
        this.notificationProvider.error(COMMON_MSG.registration.empty);
        return;
      }
      this.state = 'third';
    } else if (this.state === 'third') {
      this.filter();
      if (this.registerProvider.credentialCheck(this.user)) {
        this.registerProvider.regUser(this.user)
          .subscribe(success => {
              if (success['success'] === true) {
                const loader = this.loadingCtrl.create({
                  content: "Please wait...",
                  duration: 3000
                });
                loader.present();
                localStorage.setItem('token', success['token']);
                localStorage.setItem('user_id', success['user']['id']);
                this.navCtrl.setRoot(MainPage);
                this.userProvider.setUser(this.user);
                this.firebaseProvider.saveUserToFirebase(this.user)
              } else {
                this.notificationProvider.error(success['message'])
              };
            },
            error => {
              console.log(error);
            });
      }

      /* Update user*/
    } else if (this.state === 'settings' || this.state === 'region') {
      this.filter();
      if (this.registerProvider.credentialCheck(this.user)) {
        this.data = {
          name: this.user.name,
          lastname: this.user.lastname,
          email: this.user.email,
          gender: this.user.gender,
          birthday: this.user.birthday,
          region_id: this.user.region_id,
          business_category_id: this.user.business_category_id
        };
        this.filterRegions = [];
        this.filterBusiness = [];
        if (this.user.avatar_src !== this.userInfo.avatar_src) {
          this.data['avatar_src'] = this.user.avatar_src;
        }
        this.userProvider.update(this.data)
          .subscribe(success => {
            if (success['success'] === true) {
              this.userProvider.setUser(this.user);
              this.firebaseProvider.saveUserToFirebase(this.user);
              if (this.state === 'region') {
                this.state = 'settings';
              } else {
                this.navCtrl.pop();
              }
            }
            if (success['success'] === false) {

            }
          }, err => {
            console.log(err);
          })
      }
    }
  }

  /* Filter for regions*/
  filter() {
    if (this.state === 'third') {
      this.user.business_category_id = [];
      this.user.region_id = [];
    }
    if (this.state === 'third' || this.state === 'region') {
      this.regions.forEach(item => {
        if (item.checked === true) {
          this.filterRegions.push(item.id);
        }
      });
      this.user.region_id = this.filterRegions;
    }
    if (this.state === 'third' || this.state === 'region') {
      this.businessCategory.forEach(item => {
        if (item.checked === true) {
          this.filterBusiness.push(item.id);
        }
      });
      this.user.business_category_id = this.filterBusiness;
    }
  }

  /* Own radio-button*/
  changeBg(gender) {
    if (gender === 'male') {
      this.user.gender = 'male';
      this.getBgMale('male');
      this.getBgFemale('male');
    } else {
      this.user.gender = 'female';
      this.getBgMale('female');
      this.getBgFemale('female');
    }
  }

  /* For male-button*/
  getBgMale(gender) {
    if (gender === 'male') {
      return '#007afe';
    } else {
      return 'transparent';
    }
  }

  /* For female-button*/
  getBgFemale(gender) {
    if (gender === 'female') {
      return '#f82c53';
    } else {
      return 'transparent';
    }
  }

  /* back from states*/
  goBack() {
    if (this.state === 'second') {
      this.state = 'first';
    } else if (this.state === 'third') {
      this.state = 'second';
    } else if (this.state === 'settings') {
      this.navCtrl.pop();
    } else if (this.state === 'region') {
      this.state = 'settings';
    }
  }

}
