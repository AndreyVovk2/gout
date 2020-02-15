//module
import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';

//page
import {NewBusinessPage} from './new-business';
import {SharedModule} from "../../shared/shared.module";
import {ProvidersModule} from "../../shared/providers/providers.module";

@NgModule({
  declarations: [
    NewBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBusinessPage),
    SharedModule
  ],
})
export class NewBusinessPageModule {
}
