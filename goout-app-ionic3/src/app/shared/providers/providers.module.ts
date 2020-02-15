//ionic, angular, custom module
import {NgModule} from '@angular/core';
import {AuthProvider} from "./auth.provider";
import {RequestProvider} from "./request.provider";
import {EntityProvider} from "./base/entity.provider";
import {ConnectionProvider} from "./connection.provider";
import {UserProvider} from "./user.provider";
import {RegionProvider} from "./region.provider";
import {RegisterProvider} from "./register.provider";
import {CameraProvider} from "./camera.provider";
import {Crop} from "@ionic-native/crop";
import {Camera} from '@ionic-native/camera';
import {Base64} from "@ionic-native/base64";
import {FacebookProvider} from "./facebook.provider";
import {NotificationProvider} from "./notification.provider";
import {BusinessProvider} from "./business.provider";
import {SubBusinessProvider} from "./sub-business.provider";
import {AgesProvider} from "./ages.provider";
import {LinesProvider} from "./lines.provider";
import {Network} from "@ionic-native/network";
import {InfoProvider} from "./info.provider";
import {PostProvider} from "./post.provider";
import {MenuProvider} from "./menu.provider";
import {DishProvider} from "./dish.provider";
import {MyBusinessProvider} from "./my-business.provider";
import {FcmProvider} from "./fcm.provider";
import {FirebaseProvider} from "./firebase.provider";
import {ChatsProvider} from "./chats.provider";
import {FavoritesProvider} from "./favorites.provider";
import {Geolocation} from "@ionic-native/geolocation";
import {Keyboard} from "@ionic-native/keyboard";
import {FriendsProvider} from "./friends.provider";

//services


@NgModule({
  providers: [
    RequestProvider,
    AuthProvider,
    EntityProvider,
    ConnectionProvider,
    UserProvider,
    RegionProvider,
    RegisterProvider,
    CameraProvider,
    Camera,
    Crop,
    Base64,
    Network,
    FacebookProvider,
    NotificationProvider,
    InfoProvider,
    NotificationProvider,
    BusinessProvider,
    SubBusinessProvider,
    AgesProvider,
    LinesProvider,
    PostProvider,
    MenuProvider,
    DishProvider,
    MyBusinessProvider,
    FcmProvider,
    FirebaseProvider,
    ChatsProvider,
    FavoritesProvider,
    Geolocation,
    Keyboard,
    FriendsProvider
  ]
})
export class ProvidersModule {
}
