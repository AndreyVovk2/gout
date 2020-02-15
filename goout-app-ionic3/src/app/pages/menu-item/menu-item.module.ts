import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItemPage } from './menu-item';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MenuItemPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuItemPage),
    SharedModule,
  ],
})
export class MenuItemPageModule {}
