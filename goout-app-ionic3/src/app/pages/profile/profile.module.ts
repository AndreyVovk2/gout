import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../shared/shared.module";
//pages
import {ProfilePage} from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    SharedModule
  ]
})
export class ProfilePageModule {
}
