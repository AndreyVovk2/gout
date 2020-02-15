import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuListPage } from './menu-list';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MenuListPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuListPage),
    SharedModule
  ],
})
export class MenuListPageModule {}
