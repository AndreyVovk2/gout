import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPostsPage } from './my-posts';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MyPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPostsPage),
    SharedModule
  ],
})
export class MyPostsPageModule {}
