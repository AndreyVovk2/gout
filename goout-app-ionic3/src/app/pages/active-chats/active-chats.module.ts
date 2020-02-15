import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SharedModule} from "../../shared/shared.module";

//components

//pages
import {ActiveChatsPage} from './active-chats';


@NgModule({
  declarations: [
    ActiveChatsPage
  ],
  imports: [
    IonicPageModule.forChild(ActiveChatsPage),
    SharedModule
  ]
})
export class ActiveChatsModule {
}
