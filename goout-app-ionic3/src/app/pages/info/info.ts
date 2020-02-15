import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InfoProvider} from "../../shared/providers/info.provider";
import {ConnectionProvider} from "../../shared/providers/connection.provider";

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-info',
  segment: 'page-info'
})
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  public title: string;
  public text: any;
  public headerText: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public infoProvider: InfoProvider) {
  }

  ionViewDidLoad() {
    this.assignTitle();
}

  assignTitle(){
    switch (this.navParams.get('state')) {
      case 'about':
        this.title = 'info.about';
        this.setTextAbout(); break;
      case 'terms':
        this.title = 'info.terms-of-use';
        this.setTextTerms(); break;
      default: this.title = 'Info';
    }
  };

  setTextAbout() {
    this.infoProvider.getAboutText()
        .subscribe(success => {
          this.text = success['description'];
          this.headerText = success['name'];
    })
  };

  setTextTerms() {
    this.infoProvider.getTermsText()
        .subscribe(success => {
          this.text = success['description'];
          this.headerText = success['name'];
    })
  };


}
