import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {TranslateService} from "@ngx-translate/core";
import {NotificationProvider} from "./notification.provider";

@Injectable()

export class PostProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController,
              public translate: TranslateService,
              public notificationProvider: NotificationProvider) {

    super(request, toast);
    this.provider_name = 'post';
  }


  getAll(data: Object = null) {
    const url = this.url('all');
    return this.request.get(url, data)
  }

  getIndex(id: number, data: Object = null) {
    const url = this.url('details');
    return this.request.get(url + id, data)
  }

  createImage(data: any) {
    const url = this.url('postImage');
    return this.request.post(url, data)
  }

  filterPosts(data: any) {
    const url = this.url('filter');
    return this.request.post(url, data)
  }

  getMy(data: Object = null) {
    const url = this.url('my');
    return this.request.get(url, data)
  }

  updateGallery(data: any) {
    const url = this.url('gallery');
    return this.request.post(url, data)
  }

  updatePost(id: number, data: any) {
    const url = this.url('update');
    return this.request.put(url + id, data)
  }

  createPost(data: any) {
    const url = this.url('create');
    return this.request.post(url, data)
  }

  checkValidData(data) {
    if (data.title === '') {
      this.notificationProvider.success(this.translate.instant('errors.new-post.title'));
      return false
    } else if (data.description === '') {
      this.notificationProvider.success(this.translate.instant('errors.new-post.description'));
      return false
    } else if (data.amount_tickets === '') {
      this.notificationProvider.success(this.translate.instant('errors.new-post.amount_tickets'));
      return false
    } else if (data.price_tickets === '') {
      this.notificationProvider.success(this.translate.instant('errors.new-post.price_tickets'));
      return false
    }
    return true;
  }

}
