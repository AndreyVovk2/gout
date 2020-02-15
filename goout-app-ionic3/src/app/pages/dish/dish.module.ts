import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishPage } from './dish';
import {SharedModule} from "../../shared/shared.module";
import {ProvidersModule} from "../../shared/providers/providers.module";
import {ComponentsModule} from "../../shared/components/components.module";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
  declarations: [
    DishPage,
  ],
  imports: [
    IonicPageModule.forChild(DishPage),
    SharedModule,
    ProvidersModule,
    ComponentsModule,
    BrMaskerModule
  ],
})
export class DishPageModule {}
