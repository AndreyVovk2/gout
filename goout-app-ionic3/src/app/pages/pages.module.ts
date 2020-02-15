//page module
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {AuthPageModule} from "./auth/auth.module";
import {ProfilePageModule} from "./profile/profile.module";
import {MainPageModule} from "./main/main.module";
import {FriendsPageModule} from "./friends/friends.module";
import {ActiveChatsModule} from "./active-chats/active-chats.module";
import {NewBusinessPageModule} from "./new-business/new-business.module";
import {MyBusinessPageModule} from "./my-business/my-business.module";
import {NewLinePageModule} from "./new-line/new-line.module";
import {MyLinesPageModule} from "./my-lines/my-lines.module";
import {InfoPageModule} from "./info/info.module";
import {NewPostPageModule} from "./new-post/new-post.module";
import {MyPostsPageModule} from "./my-posts/my-posts.module";
import {EventDetailsPageModule} from "./event-details/event-details.module";
import {MenuListPageModule} from "./menu-list/menu-list.module";
import {MenuItemPageModule} from "./menu-item/menu-item.module";
import {DishPageModule} from "./dish/dish.module";
import {FavoritesPageModule} from "./favorites/favorites.module";
import {NotificationsPageModule} from "./notifications/notifications.module";
import {ModalImagePage} from "./modal-image/modal-image";
import {ModalImagePageModule} from "./modal-image/modal-image.module";
import {ComponentsModule} from "../shared/components/components.module";
import {ModalMessagePage} from "./modal-message/modal-message";
import {ModalMessagePageModule} from "./modal-message/modal-message.module";
@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(PagesModule),
    AuthPageModule,
    ProfilePageModule,
    ModalImagePageModule,
    ModalMessagePageModule,
    MainPageModule,
    ComponentsModule,
    FriendsPageModule,
    ActiveChatsModule,
    NewBusinessPageModule,
    MyBusinessPageModule,
    NewLinePageModule,
    MyLinesPageModule,
    InfoPageModule,
    NewPostPageModule,
    MyPostsPageModule,
    EventDetailsPageModule,
    MenuListPageModule,
    MenuItemPageModule,
    DishPageModule,
    FavoritesPageModule,
    NotificationsPageModule,

  ],
  bootstrap: [],
  entryComponents: [],
  providers: []
})
export class PagesModule {
}
