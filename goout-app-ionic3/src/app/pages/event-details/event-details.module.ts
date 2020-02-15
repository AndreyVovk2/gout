import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EventDetailsPage} from './event-details';
import {SharedModule} from "../../shared/shared.module";
import {NgxQRCodeModule} from "ngx-qrcode2";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ModalImagePageModule} from "../modal-image/modal-image.module";

@NgModule({
  declarations: [
    EventDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailsPage),
    SharedModule,
    NgxQRCodeModule
  ],
  providers: [
    BarcodeScanner
  ]
})
export class EventDetailsPageModule {
}
