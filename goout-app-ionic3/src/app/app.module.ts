//ionic-angular/shared-lazy module
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {PagesModule} from "./pages/pages.module";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestoreModule} from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';



//native
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {Firebase} from "@ionic-native/firebase";

//components
import {AppComponent} from './app.component';

//interceptors
import {AuthenticationInterceptor} from "./shared/interceptors/authentication.interceptor";

//providers

//function
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//config
import {appConfig} from "./app.config";
import {Base64} from "@ionic-native/base64";



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    PagesModule,
    HttpClientModule,
    SharedModule,
    AngularFireModule.initializeApp(appConfig.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent
  ],
  providers: [
    Base64,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    AngularFireDatabase,
    AngularFireAuth,
    Firebase,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  ]
})
export class AppModule {
}
