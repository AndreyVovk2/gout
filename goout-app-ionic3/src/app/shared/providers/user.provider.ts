import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class UserProvider extends EntityProvider {

  provider_name: string;

  private user: any = {};
  public userInfo = new BehaviorSubject(this.user);
  public userInfo$ = this.userInfo.asObservable();

  constructor(public request: RequestProvider,
              public toast: ToastController,) {

    super(request, toast);
    this.provider_name = 'users';

  }

  setUser(data) {
    this.userInfo.next(data);
  }

  getUser(){
    return this.userInfo.getValue();
  }

  update(data: any) {
    const url = this.url('index');
    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('update');
          // this.notification('success', msg);
        },
        err => {
          const msg = this.msg('err');
          this.notification('error', msg)
        });
  }

  getMe(data: Object = null) {
    const url = this.url('me');
    return this.request.get(url, data);
  }

  getAll(data: Object = null) {
    const url = this.url('all');
    return this.request.get(url, data);
  }

  getUserId(id: any, data: Object = null){
    const url = this.url('id');
    return this.request.get(url+id,data);
  }

  getUserStorageId() {
    return localStorage.getItem('user_id');

  }

  validateEmail(email) {
    let validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
  }


  validateField(field) {
    let validator = /^[a-zA-Z\u0590-\u05feа-яА-Я'][a-zA-Z\u0590-\u05feа-яА-Я-' ]+[a-zA-Z\u0590-\u05feа-яА-Я']?$/u;

    return validator.test(field);
  }

  credentialsCheck(data: any) {
    if (!data.email || !data.name || !data.birthday) {
      const msg = this.msg('empty');
      this.notification('error', msg);
      return false;
    }
    // if (!data.job_categories.length) {
    //   const msg = this.msg('emptycategory');
    //   this.notification('error', msg);
    //   return false;
    // }
    if (!this.validateEmail(data.email)) {
      const msg = this.msg('emailerr');
      this.notification('error', msg);
      return false;
    }
    if (!this.validateField(data.name)) {
      const msg = this.msg('nameerr');
      this.notification('error', msg);
      return false;
    }
    return true;
  }

  getFbFriends(data: {access_token: string }) {
    const url = this.url('friends');
    return this.request.post(url, data);
  }




}
