import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ActionSheetController, Events} from "ionic-angular";
import {CameraProvider} from "../../providers/camera.provider";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'custom-photo.html',
  selector: 'custom-photo'
})

export class CustomPhotoComponent implements OnInit {
  @Output() changePhoto = new EventEmitter<string>();
  @Input() picture: string;

  public photo: any;

  constructor(private cameraProvider: CameraProvider,
              private sanitaizer: DomSanitizer,
              private translate: TranslateService,
              public actionCtrl: ActionSheetController,
              public events: Events){
  }


  ngOnInit(){
  }

  addPhoto(){
    let actionSheet = this.actionCtrl.create({
      cssClass: "modal-camera",
      buttons: [
        {
          text: this.translate.instant("photo.gallery"),
          handler: () => {
            this.cameraProvider.getMedia(2)
              .then(res => {
                if (typeof res !== 'undefined') {
                  this.photo = this.sanitaizer.bypassSecurityTrustResourceUrl(res);
                  this.changePhoto.emit(res);
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
                  this.photo = this.sanitaizer.bypassSecurityTrustResourceUrl(res);
                  this.changePhoto.emit(res);
                }
              })
          }
        }
      ]
    });
    actionSheet.present();
  }

}
