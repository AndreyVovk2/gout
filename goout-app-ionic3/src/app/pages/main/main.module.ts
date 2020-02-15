//module
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../shared/shared.module";


//page
import {MainPage} from './main';

//components
import {MenuLeftComponent} from "./menu-left/menu-left.component";
import {MenuRightComponent} from "./menu-right/menu-right.component";
import {SearchSettingsComponent} from "./search-settings/search-settings.component";
import {NoticeComponent} from "./notice/notice.component";


@NgModule({
  declarations: [
    MainPage,
    MenuLeftComponent,
    NoticeComponent,
    MenuRightComponent,
    SearchSettingsComponent
  ],
  imports: [
    IonicPageModule.forChild(MainPage),
    SharedModule
  ],
  entryComponents: [
    MenuLeftComponent,
    NoticeComponent,
    MenuRightComponent,
    SearchSettingsComponent
  ]
})
export class MainPageModule {
}
