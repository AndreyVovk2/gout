//module
import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from "ionic-angular";
import {ProvidersModule} from "./providers/providers.module";
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "./components/components.module";
import {AgmCoreModule} from "@agm/core";
import {PipesModule} from "./pipes/pipes.module";


@NgModule({
  imports: [
    IonicModule.forRoot(SharedModule),
    ProvidersModule,
    ComponentsModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSpDAUJtWloy-hqtDCfiVFlrj4qOtKnnA',
      libraries: ['places'],
      language: 'iw'
    }),
  ],
  bootstrap: [
    IonicApp
  ],
  exports: [
    TranslateModule,
    ComponentsModule,
    PipesModule
  ]
})

export class SharedModule {
}
