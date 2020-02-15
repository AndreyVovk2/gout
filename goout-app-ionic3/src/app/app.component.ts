import {Component, OnInit, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ConnectionProvider} from "./shared/providers/connection.provider";
import {TranslateService} from "@ngx-translate/core";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {AuthPage} from "./pages/auth/auth";
import {MainPage} from "./pages/main/main";
import {FirebaseProvider} from "./shared/providers/firebase.provider";

@Component({
  templateUrl: 'app.html'
})

export class AppComponent implements OnInit {

  @ViewChild(Nav) navCtrl: Nav;

  rootPage: any;

  constructor(public platform: Platform,
              public splashScreen: SplashScreen,
              public screenOrientation: ScreenOrientation,
              public translate: TranslateService,
              private connection: ConnectionProvider,
              private firebase: FirebaseProvider) {
    this.initializeApp();
    // let date = {
    //   hour: new Date().getHours(),
    //   minute: new Date().getMinutes(),
    // };
    let date = new Date().getTime();
    platform.pause.subscribe(e => {
      this.firebase.checkOnline('offline', date)
    });

    platform.resume.subscribe(e => {
      this.firebase.checkOnline('online', null)
    });

    window.addEventListener('beforeunload', () => {
      this.firebase.checkOnline('offline', date)
    });
  }

  initializeApp() {
    this.translate.setDefaultLang('he');
    // this.translate.use('en');
    this.platform.ready().then(() => {
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      if (!localStorage.token) {
        this.navCtrl.setRoot(AuthPage);
      } else {
        this.navCtrl.setRoot(MainPage);
      }
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });
  }

  ngOnInit() {
    this.connection.startMonitoringConnection();

  }

}

