import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPostPage} from './new-post';
import {SharedModule} from "../../shared/shared.module";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
  declarations: [
    NewPostPage,

  ],
  imports: [
    IonicPageModule.forChild(NewPostPage),
    SharedModule,
    BrMaskerModule
  ],
})
export class NewPostPageModule {}
