//module
import { NgModule} from '@angular/core';
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//components
import {HeaderComponent} from "./header/header.component";
import {ItemCardComponent} from "./item-card/item.card.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {CustomPhotoComponent} from "./custom-photo/custom-photo.component";
import {MainHeaderComponent} from "./main-header/main-header.component";
import {InputSelectComponent} from "./input-select/input-select.component";
import {PopoverSelectComponent} from "./popover-select/popover-select.component";
import {SelectComponent} from "./select/select.component";
import {ChatRoomComponent, MomentWeek} from "./chat-room/chat-room.component";
import {ModalWindowComponent} from "./modal-window/modal-window.component";
import {PipesModule} from "../pipes/pipes.module";
import {MainEventComponent} from "./main-event/main-event.component";
import {TranslateModule} from "@ngx-translate/core";
import {ModalInvateComponent} from "./modal-invate/modal-invate";

// import localeDeAt from '@angular/common/locales/de-at'
// import {registerLocaleData} from "@angular/common";
// registerLocaleData(localeDeAt);

@NgModule({
  declarations: [
    MomentWeek,
    ModalInvateComponent,
    HeaderComponent,
    ItemCardComponent,

    SearchBarComponent,
    CustomPhotoComponent,
    MainHeaderComponent,
    InputSelectComponent,
    PopoverSelectComponent,
    SelectComponent,
    ModalWindowComponent,
    ChatRoomComponent,
    MainEventComponent,
  ],
  imports: [
    IonicModule.forRoot(ComponentsModule),
    PipesModule,
    TranslateModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    ModalInvateComponent,
    HeaderComponent,
    ItemCardComponent,
    SearchBarComponent,
    CustomPhotoComponent,
    MainHeaderComponent,
    InputSelectComponent,
    PopoverSelectComponent,
    SelectComponent,
    ChatRoomComponent,
    ModalWindowComponent,
    MainEventComponent
  ],
  exports: [
    HeaderComponent,
    ItemCardComponent,
    SearchBarComponent,
    CustomPhotoComponent,
    MainHeaderComponent,
    InputSelectComponent,
    PopoverSelectComponent,
    SelectComponent,
    ModalWindowComponent,
    ChatRoomComponent,
    MainEventComponent
  ],
//   providers: [
// { provide: LOCALE_ID, useValue: "de-at" }]
})

export class ComponentsModule {
}
