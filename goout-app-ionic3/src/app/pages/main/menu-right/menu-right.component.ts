import {Component, Input, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProfilePage} from "../../profile/profile";
import {MyBusinessPage} from "../../my-business/my-business";
import {NewBusinessPage} from "../../new-business/new-business";
import {InfoPage} from "../../info/info";
import {ConnectionProvider} from "../../../shared/providers/connection.provider";
import {FavoritesPage} from "../../favorites/favorites";
// import {PrivacyEventsPage} from "../../privacy-events/privacy-events";

@Component({
  templateUrl: 'menu-right.html',
  selector: 'menu-right'
})

export class MenuRightComponent implements OnInit {

  @Input() public business: any;
  @Input() public user: any;

  constructor(private navCtrl: NavController,
              public connectionProvider: ConnectionProvider) {

  }

  ngOnInit() {
  }

  goTo(way: string) {
    console.log(way);
    /** check internet connection **/
    if (this.connectionProvider.getConnectionStatus()) {

      switch (way) {
        case 'profile':
          this.navCtrl.push(ProfilePage, {state: "settings"});
          break;
        case 'business': {
          if (this.business.myBusiness.length) {
            this.navCtrl.push(MyBusinessPage, {state: "myBusiness"})
          } else {
            this.navCtrl.push(NewBusinessPage, {state: "create"})
          }
        }
          break;
        case 'my-events':
          this.navCtrl.push(MyBusinessPage, {state: "businessPublicist", business: this.business.businessPublicist});
          break;
        case 'attached-business':
          this.navCtrl.push(MyBusinessPage, {state: "businessHostes", business: this.business.businessHostes});
          break;
        case 'privacy-events':
          // this.navCtrl.push();
          break;

        case 'favorites':
          this.navCtrl.push(FavoritesPage);
          break;
        case 'about':
          this.navCtrl.push(InfoPage, {state: "about"});
          break;
        case 'terms-of-use':
          this.navCtrl.push(InfoPage, {state: "terms"});
          break;
        default:
          console.log('Page ' + way + ' not yet created');
      }
    }
  }

}
