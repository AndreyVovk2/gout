//module
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//page
import { InfoPage } from './info';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
    SharedModule
  ],
})
export class InfoPageModule {}
