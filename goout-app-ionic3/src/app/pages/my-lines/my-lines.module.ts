import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLinesPage } from './my-lines';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MyLinesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLinesPage),
    SharedModule
  ],
})
export class MyLinesPageModule {}
