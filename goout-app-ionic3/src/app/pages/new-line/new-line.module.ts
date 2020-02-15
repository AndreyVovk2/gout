import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLinePage } from './new-line';
import {SharedModule} from "../../shared/shared.module";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
  declarations: [
    NewLinePage,
  ],
  imports: [
    IonicPageModule.forChild(NewLinePage),
    SharedModule,
    BrMaskerModule
  ],
})
export class NewLinePageModule {}
