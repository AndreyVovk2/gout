import {Component, Input, OnInit} from '@angular/core';
import {
  ActionSheetController,
  Events,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';
import {AgesProvider} from "../../shared/providers/ages.provider";
import {PostProvider} from "../../shared/providers/post.provider";
import moment from 'moment';
import {CameraProvider} from "../../shared/providers/camera.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {TranslateService} from "@ngx-translate/core";
import {MenuListPage} from "../menu-list/menu-list";
import {NotificationsPage} from "../notifications/notifications";
import {BusinessProvider} from "../../shared/providers/business.provider";
import {ModalInvateComponent} from "../../shared/components/modal-invate/modal-invate";

@IonicPage()

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage implements OnInit {

  public button: string;

  public gallery: any = [];
  public newGallery: any = {};

  public post: any = {};
  public line: any = {};
  public state: string;
  public picture: string;
  public postId: number;
  public minDate: any;
  public maxDate: any;

  public modeChecked: boolean = false;
  public mode: string = "fromAge";
  public title: string;

  public ages: any;
  public maleArray: any = [];
  public femaleArray: any = [];
  public customMonthName: any = ['ינואר', 'פברואר ', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  public access: boolean = false;
  public unsubscribe: any = [];
  public newBusinessId: number = 0;
  public leftOptions: any = {
    cssClass: 'left-position'
  };

  public rightOptions: any = {
    cssClass: 'right-position'
  };
  @Input('alert') alert: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private agesProvider: AgesProvider,
              private postProvider: PostProvider,
              private toastCtrl: ToastController,
              public events: Events,
              public modalCtrl: ModalController,
              public translate: TranslateService,
              private cameraProvider: CameraProvider,
              private actionCtrl: ActionSheetController,
              private sanitaizer: DomSanitizer,
              private notification: NotificationProvider,
              private loadingCtrl: LoadingController,
              public toastController: ToastController,
              private businessProvider: BusinessProvider,) {
    this.newGallery = {
      post_id: null,
      picture: []
    };
    this.minDate = new Date().toISOString();
    this.maxDate = new Date().getFullYear() + 5;
    this.getPost();
    console.log('new-post');
  }

  getPost() {
    this.state = this.navParams.get('state');
    console.log(this.state);
    if (this.state === "create") {
      this.line = this.navParams.get('data');
      this.picture = this.line.avatar;
      this.post = {
        titlee: '',
        description: '',
        amount_tickets: '',
        price_tickets: '',
        waze_link: 'random.cat',
        line_id: '',
        mode: 1,
        gallery: []
      };
      this.line.created_at = moment(this.line.created_at).format('YYYY-MM-DD');
      this.title = this.translate.instant('new-line.header');
    } else {
      let data = this.navParams.get('data');
      this.newGallery.post_id = data.id;
      this.line = data.line;
      if (!data.picture) {
        setTimeout(() => {
          this.picture = data['line']['avatar'];
        }, 30);
      } else {
        this.picture = data.picture;
      }
      this.post = {
        titlee: data.titlee,
        description: data.description,
        amount_tickets: data.amount_tickets,
        price_tickets: data.price_tickets,
        waze_link: 'random.cat',
        line_id: data.line_id,
        mode: 1
      };
      this.title = this.translate.instant('new-line.edit');
      for (let i = 0; i < data.galleries.length; i++) {
        this.gallery.push(data.galleries[i].picture)
      }
      this.checkMode(data, "getEdit");
      this.postId = data.id;
      this.picture = data.picture;
      this.line.created_at = moment(this.line.created_at).format('DD-MM-YYYY');
    }
  }

  checkMode(data: any, state: string) {
    if (state === 'getEdit') {
      switch (data.mode) {
        case "1":
          this.modeChecked = false;
          break;
        case "2":
          this.modeChecked = true;
          this.post.price_tickets = null;
          this.mode = 'throughInvite';
          break;
        case "3":
          this.modeChecked = true;
          this.post.price_tickets = null;
          this.mode = 'fromAge';
          break;
      }
    } else if (state === "createPost") {
      if (this.modeChecked === true && this.mode === "fromAge") {
        this.post.mode = 3;
        this.post.price_tickets = '';
      } else if (this.modeChecked === false) {
        this.post.mode = 1;
      }
    } else {
      if (this.modeChecked === true && this.mode === "fromAge") {
        this.post.mode = 3;
        this.post.price_tickets = '';
      } else if (this.modeChecked === false) {
        this.post.mode = 1;
      } else if (this.mode === 'throughInvite') {
        this.post.price_tickets = '';
      }
    }

  }

  ngOnInit() {
    this.getAges();

  }

  changeMode(mode: string) {
    if (mode === 'throughInvite') {
      this.mode = 'throughInvite';
      this.classFromAge(mode);
      this.classThroughInvite(mode);
      this.post.mode = 3;
    } else {
      this.mode = 'fromAge';
      this.classFromAge(mode);
      this.classThroughInvite(mode);
      this.post.mode = 2;
    }
  }

  classFromAge(mode: string) {
    if (mode != 'throughInvite') {
      return true;
    } else {
      return false
    }
  }

  classThroughInvite(mode: string) {
    if (mode != 'fromAge') {
      return true
    } else {
      return false
    }
  }

  getAges() {
    this.agesProvider.getAges()
      .subscribe(success => {
        this.ages = success['data'];
        this.ages.filter(item => {
          if (item.gender === 'male') {
            this.maleArray.push(item)
          } else {
            this.femaleArray.push(item)
          }
        })
      })
  }

  getPhoto(event: string) {
    this.post.picture = event;
  }

  addGallery() {
    let actionSheet = this.actionCtrl.create({
      cssClass: "modal-camera",
      buttons: [
        {
          text: this.translate.instant('photo.gallery'),
          handler: () => {
            this.cameraProvider.getMedia(2)
              .then(res => {
                if (typeof res !== 'undefined') {
                  if (this.state === 'create') {
                    this.gallery.push(this.sanitaizer.bypassSecurityTrustResourceUrl(res));
                    this.post.gallery.push(res);
                  } else {
                    this.newGallery.picture.push(res);
                    this.gallery.push(this.sanitaizer.bypassSecurityTrustResourceUrl(res));
                  }
                }
              })
          }
        },
        {
          text: this.translate.instant('photo.camera'),
          handler: () => {
            this.cameraProvider.getMedia(1)
              .then(res => {
                if (typeof res !== 'undefined') {
                  if (this.state === 'create') {
                    this.gallery.push(this.sanitaizer.bypassSecurityTrustResourceUrl(res));
                    this.post.gallery.push(res);
                  } else {
                    this.newGallery.picture.push(res);
                    this.gallery.push(this.sanitaizer.bypassSecurityTrustResourceUrl(res));
                  }
                }
              })
          }
        }
      ]
    });
    actionSheet.present();
  }

  addPhoto(btn: string) {
    this.button = btn;
  }

  createPost(way: string) {
      // let profileModal = this.modalCtrl.create(ModalInvateComponent, { userId: 8675309 });
      // profileModal.present();
    if (this.post.price_tickets === '') {
      let toast = this.toastCtrl.create({
          message: 'אנא הכנס מחיר כרטיסים',
          duration: 3000,
          position: 'top'
        }
      );
      toast.present()
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
      if (this.businessProvider.credentialCheck(this.post, 'create')) {
        if (this.access) {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...',
            enableBackdropDismiss: true
          });
          loading.present();
          console.log(this.post);
          let business = this.businessProvider.createBusiness(this.post)
            .subscribe(success => {
              this.notification.success(success['message']);
              if (success['success'] === true) {
                if (way === 'menu') {
                  this.newBusinessId = success['data']['id'];
                  this.navCtrl.push(MenuListPage, {business_id: this.newBusinessId, state: "edit"});
                  loading.dismiss();
                } else {
                  this.navCtrl.pop();
                  loading.dismiss();
                }
              }
            });
          this.unsubscribe.push(business)
        } else {
          this.navCtrl.push(NotificationsPage)
        }
      }

      console.log(this.line);
    }

    // this.checkMode(null, "createPost");
    // this.post.line_id = this.line.id;
    // console.log(this.post);
    // // if (this.postProvider.checkValidData(this.post)) {
    //   let loading = this.loadingCtrl.create({
    //     content: 'Please wait...',
    //     enableBackdropDismiss: true
    //   });
    //   loading.present();
    //   this.postProvider.createPost(this.post)
    //     .subscribe(success => {
    //       this.notification.success(success['message']);
    //       if (success['success'] === true) {
    //         this.navCtrl.pop();
    //         loading.dismiss();
    //       }
    //     });
    // }
  }

  updatePost() {
    if (this.post.description === '') {
      const toast = this.toastController.create({
          message: 'שם שדה ריק ',
          duration: 5000
        }
      );
      toast.present()
    } else {
      this.checkMode(null, "updatePost");
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.postProvider.updatePost(this.postId, this.post)
        .subscribe(success => {
          this.notification.success(success['message']);
          if (success['success'] === true) {
            if (!this.newGallery.picture.length) {
              this.navCtrl.pop();
              loading.dismiss();
            } else {
              this.postProvider.updateGallery(this.newGallery)
                .subscribe(success => {
                  if (success['success'] === true) {
                    this.navCtrl.pop();
                    loading.dismiss();
                  }
                });
            }

          }
        });
      console.log(this.post);
    }
  }

}
