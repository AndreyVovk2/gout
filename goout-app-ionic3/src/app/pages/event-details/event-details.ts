import {Component, Input, ViewChild} from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Slides,
  ToastController
} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {MenuListPage} from "../menu-list/menu-list";
import {ChatRoomComponent} from "../../shared/components/chat-room/chat-room.component";
import {ChatsProvider} from "../../shared/providers/chats.provider";
import {UserProvider} from "../../shared/providers/user.provider";
import {NewPostPage} from "../new-post/new-post";
import {PostProvider} from "../../shared/providers/post.provider";
import {FriendsPage} from "../friends/friends";
import set = Reflect.set;
import {FacebookProvider} from "../../shared/providers/facebook.provider";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {TranslateService} from "@ngx-translate/core";
import {ModalImagePage} from "../modal-image/modal-image";
import {ProfilePage} from "../profile/profile";
import {ModalMessagePage} from "../modal-message/modal-message";
import {Base64} from "@ionic-native/base64";
import {CameraProvider} from "../../shared/providers/camera.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {MenuItemPage} from "../menu-item/menu-item";
import {BusinessProvider} from "../../shared/providers/business.provider";

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  @ViewChild(Slides) public slides: Slides;
  public id: number;
  public event: any = {
    business: {},
    line: {},
    creator: {}
  };
  public state: string;
  public user: any = {};
  public show: boolean = false;
  private idEvent: any;
  public slider: boolean = false;

  public count: number = 0;
  public modals: any = {
    show: false,
    popover: {
      buy: false,
      invite: false,
      qrcode: false,
      alert: false,
    }
  };
  // qrData = null;
  // createdCode = null;
  // scannedCode = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              private barcodeScanner: BarcodeScanner,
              public chatsProvider: ChatsProvider,
              private userProvider: UserProvider,
              public postProvider: PostProvider,
              private facebookProvider: FacebookProvider,
              private notification: NotificationProvider,
              private modalController: ModalController,
              public actionCtrl: ActionSheetController,
              private cameraProvider: CameraProvider,
              private businessProvider: BusinessProvider,
  ) {

    this.id = this.navParams.get('id');
    this.state = this.navParams.get('state');
  }

  @ViewChild('myNav') nav: NavController;

  ionViewCanEnter() {
    this.getPost();
  }

  // public rootPage: any = TabsPage;
  ionViewDidEnter() {
    this.getPost();
    setTimeout(() => {
      this.slider = true;
    }, 10);
  }

  getPost() {

    this.postProvider.getIndex(this.id)
      .subscribe(success => {
        this.event = success['data'];
        console.log(this.event);
        this.idEvent = this.event.id;
        this.businessProvider.setIdBusiness(this.idEvent);
        console.log(this.idEvent);
        this.event.date = this.event.created_at.substr(2, 2) + "/" + this.event.created_at.substr(5, 2) + "/" + this.event.created_at.substr(8, 2);
        this.event.time = this.event.created_at.substr(11, 5);
      })
  }

  ionViewDidLoad() {
    this.user = this.userProvider.getUser();
  }

  editPost() {
    this.navCtrl.push(NewPostPage, {data: this.event, state: "edit"})
  }

  showMenu() {
    this.navCtrl.push(MenuListPage, {business_id: this.event.line.business_id, state: this.state});
    console.log(this.event.line.business_id)


  }

  plusCount() {
    this.count += 1;
  }

  minusCount() {
    if (this.count <= 0) {
      this.count = 0
    } else {
      this.count -= 1;
    }
  }

  popover(event) {
    let target = event.target.className;
    if (target.indexOf('wrapper') !== -1) {
      this.modals = {
        show: false,
        popover: {
          buy: false,
          invite: false,
          qrcode: false,
          alert: false
        }
      };
    }
  }

  buyTickets() {
    this.modals.show = false;
    this.show = true;
  }

  showModal(string: string) {
    this.modals.show = true;
    if (string === "buy") {
      this.modals.buy = true
    } else if (string === "invite") {
      this.modals.invite = true
    } else if (string === 'qrcode') {
      this.modals.qrcode = true
    }
  }

  // createCode() {
  //   this.createdCode = this.qrData;
  // }
  //
  // scanCode(){
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     this.scannedCode = barcodeData.text
  //   })
  //
  // }

  openChat() {
    this.chatsProvider.user = this.user;
    this.chatsProvider.event = this.event;
    this.chatsProvider.initialize();
    this.navCtrl.push(ChatRoomComponent, {event: this.event, partner: this.event.creator, user: this.user});
  }

  goToPhoneList() {
    console.log('goToPhoneList');
    this.navCtrl.push(FriendsPage, {type: "phone", lineId: this.event.line.id});
  }

  FBshowDialog() {

    let quote = this.event.title.toUpperCase() + '. ' + this.event.description;
    console.log(quote);

    let options = {
      method: "share",
      href: "http://example.com",
      hashtag: '#goOut',
      quote: quote,
      share_feedWeb: true, // iOS only
    };

    this.facebookProvider.showDialog(options)
      .then(() => {
        this.notification.success(this.translate.instant('errors.new-post.facebook'));
      })
      .catch((err) => {
        console.log(err);
        this.notification.error(this.translate.instant('errors.new-post.canceled'));
      })
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  imageWidth(image) {
    console.log(image)
  }

  async openModal(image) {
    console.log(image);
    // console.log(id);
    // this.nav.push(ModalImagePage);
    const modal = await this.modalController.create(ModalImagePage, {photo: image});
    // componentProps: {}
    return await modal.present()
  }

  async notifications() {
    const modal = await this.modalController.create(ModalMessagePage);
    // this.presentToast();
    return await modal.present()
  }

  addPicture(event) {
    let actionSheet = this.actionCtrl.create({
      cssClass: "modal-camera",
      buttons: [
        {
          text: this.translate.instant("photo.gallery"),
          handler: () => {
            this.cameraProvider.getMedia(2)
              .then(res => {
                if (typeof res !== 'undefined') {
                  this.submitPhoto(res);
                  console.log(res);
                  // this.changePhoto.emit(res);
                }
              })
          }
        },
        {
          text: this.translate.instant("photo.camera"),
          handler: () => {
            this.cameraProvider.getMedia(1)
              .then(res => {
                if (typeof res !== 'undefined') {
                  this.submitPhoto(res);
                  // this.changePhoto.emit(res);
                }
              })
          }
        }
      ]
    });
    actionSheet.present();

    // this.base64.encodeFile(event).then((base64File: string) => {
    //     console.log(base64File);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // )
    // console.log(event);
    // const picture = new FormData;
    // picture.append('picture', event[0]);
    // const data = {
    //   post_id: 14,
    // }

  }

  submitPhoto(photo) {
    this.postProvider.createImage({post_id: this.idEvent, picture: [photo]}).subscribe(res => {
      console.log(res);
      this.getPost();
    })
  }
}

