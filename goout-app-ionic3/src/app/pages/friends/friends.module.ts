//module
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../shared/shared.module";

//pages
import {FriendsPage} from './friends';
import {Contact, Contacts} from "@ionic-native/contacts";
import {Base64} from "@ionic-native/base64";

@NgModule({
  declarations: [
    FriendsPage
  ],
  imports: [
    IonicPageModule.forChild(FriendsPage),
    SharedModule
  ],
  entryComponents: [
  ],
  providers: [
    Contacts,
    Contact,
    Base64
  ],
})
export class FriendsPageModule {
}
