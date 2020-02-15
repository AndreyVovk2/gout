import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {Facebook} from "@ionic-native/facebook";
import moment from "moment";
import {RequestProvider} from "./request.provider";
import {User} from "../intefaces/user.interface";

@Injectable()

export class FacebookProvider extends EntityProvider {

  private user: User;

  constructor(public request: RequestProvider,
              public toast: ToastController,
              public facebook: Facebook) {

    super(request, toast);
    this.provider_name = 'facebook';

  }

  async facebookData() {
   const req = await this.facebook.login(['public_profile', 'user_friends', 'email', 'user_birthday']);
    console.log(req);
    return await this.getUserDetail(req.authResponse.userID);
  }

  async getUserDetail(userId) {
    const req = await this.facebook.api("/" + userId + "/?fields=id,gender,email,first_name,last_name,picture.type(normal),birthday", ['public_profile', 'user_birthday']);
    console.log(req);
    return await this.parseUserData(req);
  }

  parseUserData(res) {
    console.log(res);
    this.user = {
      name: res['first_name'],
      lastname: res['last_name'],
      email: res['email'],
      gender: res['gender'],
      facebook_id: res['id'],
      avatar_url: res['picture']['data']['url'],
      birthday: moment(res.birthday).format('YYYY-MM-DD')
    };

    return this.user;
  }

  getLoginStatus(){
    return this.facebook.getLoginStatus();
  }

  getAccessToken(){
    return this.facebook.getAccessToken()
  }

  showDialog(options) {
    return this.facebook.showDialog(options);
  }




}
