import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBusinessPage } from './my-business';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MyBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(MyBusinessPage),
    SharedModule
  ],
})
export class MyBusinessPageModule {}
