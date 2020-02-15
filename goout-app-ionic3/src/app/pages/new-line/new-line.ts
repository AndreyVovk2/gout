import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AgesProvider} from "../../shared/providers/ages.provider";
import {LinesProvider} from "../../shared/providers/lines.provider";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {MenuListPage} from "../menu-list/menu-list";
import {NotificationsPage} from "../notifications/notifications";
import {BusinessProvider} from "../../shared/providers/business.provider";

@IonicPage()

@Component({
  selector: 'page-new-line',
  templateUrl: 'new-line.html',
})
export class NewLinePage {

  public customMonthName: any = ['ינואר', 'פברואר ', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  public unsubscribe: any = [];
  public line: any = {};

  public ages: any;

  public maleArray: any = [];
  public femaleArray: any = [];
  public access: boolean = false;
  public lineId: number;
  public avatar: any;
  public title: string;
  public newBusinessId: number = 0;
  public state: string;
  public minDate: any;
  public maxDate: any;

  public selectMale: any;
  public selectFemale: any;
  public popups: any = {};
  public business: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private agesProvider: AgesProvider,
              private linesProvider: LinesProvider,
              private notification: NotificationProvider,
              private loadingCtrl: LoadingController,
              public events: Events,
              private businessProvider: BusinessProvider,
              public translate: TranslateService,
              private sanitizer: DomSanitizer) {
    this.state = this.navParams.get('state');
    this.minDate = new Date().toISOString();
    this.maxDate = new Date().getFullYear() + 5;
    this.initLine();
    this.getAges();
    this.events.subscribe('access', res => {
      this.access = res;
    })
  };

  initLine() {
    if (this.state === 'create') {
      this.line = {
        title: '',
        date: '',
        time: '',
        avatar: '',
        business_id: this.navParams.get('business_id'),
        boy_age_id: '',
        girl_age_id: '',
      };
      this.title = 'יצירת ליין חדש';
    } else {
      const data = this.navParams.get('line');
      console.log(data);
      this.lineId = data.id;
      this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(data.avatar);
      this.line = {
        title: data.title,
        date: data.date.substr(0, 4) + "-" + data.date.substr(5, 2) + "-" + data.date.substr(-2),
        time: data.time,
        business_id: data.business_id,
        boy_age_id: data.boy_age_id,
        girl_age_id: data.girl_age_id,
      };
      this.title = this.translate.instant('my-lines.title');
    }
  }

  showPopup(state: string, event: any) {
    event.stopPropagation();
    if (this.popups.maleAge || this.popups.femaleAge) {
      this.popups = {
        maleAge: false,
        femaleAge: false
      };
    } else {
      switch (state) {
        case 'maleAge':
          this.popups.maleAge = true;
          break;
        case 'femaleAge':
          this.popups.femaleAge = true;
          break;
      }
    }
  }

  getPopupData(data: any, state: string) {
    switch (state) {
      case 'maleAge':
        this.selectMale = data.age;
        this.line.boy_age_id = data.id;
        this.popups.maleAge = false;
        break;
      case 'femaleAge':
        this.selectFemale = data.age;
        this.line.girl_age_id = data.id;
        this.popups.femaleAge = false;
        break;
    }
  }

  closeLinePopup() {
    this.popups = {
      maleAge: false,
      femaleAge: false
    };
  }

  getAges() {
    this.agesProvider.getAges()
      .subscribe(success => {
        let ages = success['data'];
        console.log(ages);
        ages.filter(item => {
          if (item.gender === 'male') {
            this.maleArray.push(item);
            console.log(this.line.boy_age_id);
          } else {
            this.femaleArray.push(item);
          }
          if (item.id === this.line.boy_age_id) {
            this.selectMale = item.age;
          }
          if (item.id === this.line.girl_age_id) {
            this.selectFemale = item.age;
          }
        })
      })
  }

  getLinePhoto(event: string) {
    this.line.avatar = event;
  }

  updateLine() {
    console.log(this.line);
    this.linesProvider.updateLine(this.line, this.lineId)
      .subscribe(success => {
        if (success['success'] === true) {
          this.navCtrl.pop();
          this.notification.success(success['message']);
        } else {
          this.notification.success(success['message']);
        }
      })
  }

  createLine(way: string) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
    if (this.businessProvider.credentialCheck(this.line, 'create')) {
      if (this.access) {
        // let loading = this.loadingCtrl.create({
        //   content: 'Please wait...',
        //   enableBackdropDismiss: true
        // });
        loading.present();
        console.log(this.line);
        let business = this.linesProvider.createLine(this.line)
          .subscribe(success => {
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
          });
        this.unsubscribe.push(business)
      } else {
        this.navCtrl.push(NotificationsPage)
      }
    }
    console.log(this.line);
    // this.linesProvider.updateLine(this.line,this.lineId)
    //   .subscribe(success => {
    //     if(success['success'] === true){
    //       this.navCtrl.pop();
    //       this.notification.success (success['message']);
    //     }else{
    //       this.notification.success(success['message']);
    //     }
    //   });
    // this.linesProvider.createLine(this.line)
    //   .subscribe( success => {
    //     this.notification.success(success['message']);
    //     if(success['success'] === true){
    //       this.navCtrl.pop();
    //     }
    //   });

  }
}
