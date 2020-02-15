import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AuthPage} from './auth';
import {SharedModule} from "../../shared/shared.module";
import {Facebook} from "@ionic-native/facebook";
import {ProvidersModule} from "../../shared/providers/providers.module";
import {BrMaskerModule} from "brmasker-ionic-3";

@NgModule({
  declarations: [
    AuthPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
    SharedModule,
    BrMaskerModule,
    ProvidersModule
  ],
  providers: [
    Facebook
  ]
})
export class AuthPageModule {
}
