import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Location} from '@angular/common';

/**
 * Generated class for the ModalImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-image',
  templateUrl: 'modal-image.html',
})
export class ModalImagePage {
  public state: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private location: Location) {
    this.state = this.navParams.get('state');
    console.log(this.state);
  }

  images: any;
  private nav: any;

  goBack() {
    this.navCtrl.pop();

  }

  navigateForward() {
    // this.nav.push('nav-detail');
  }

  ionViewDidEnter() {
    this.images = this.navParams.get('photo')
  }
}
