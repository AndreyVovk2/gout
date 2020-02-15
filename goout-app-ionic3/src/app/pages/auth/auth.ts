import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
//pages
import {ProfilePage} from "../profile/profile";
import {MainPage} from "../main/main";
//providers
import {UserProvider} from "../../shared/providers/user.provider";
import {FacebookProvider} from "../../shared/providers/facebook.provider";
import {AuthProvider} from "../../shared/providers/auth.provider";


export declare interface sendCredentials {
  phone: string,
}

export declare interface verifyCredentials {
  phone: string,
  code: string
}

@IonicPage({
  name: 'page-auth',
  segment: 'page-auth'
})

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})

export class AuthPage {
number = localStorage.getItem('number_user');
  private send: sendCredentials = {
    phone: '0506885558'
  };
  private verify: verifyCredentials = {
    phone: this.send.phone,
    code: ''
  };

  inputs: any = [
    {value: '', id: 'input1'},
    {value: '', id: 'input2'},
    {value: '', id: 'input3'},
    {value: '', id: 'input4'},
  ];

  code: any = [];

  public state: any = 'send';
  public checkRegister = true;
  public user: any = {};

  constructor(private authProvider: AuthProvider,
              public navCtrl: NavController,
              private userProvider: UserProvider,
              private facebookProvider: FacebookProvider) {

  }

  saveValue(event: any, index: any) {
    // const inputs = [
    //   {value: '', id: 'input1'},
    //   {value: '', id: 'input2'},
    //   {value: '', id: 'input3'},
    //   {value: '', id: 'input4'},
    // ];
    this.inputs[index].value = event.value;
    this.changeInputFocus(event._elementRef.nativeElement, index)
  }
  changeInputFocus(event, index) {
    if (index === this.inputs.length - 1) {
      return ;

    }
    (event.nextSibling.firstElementChild as any).focus()

     // ( event.previousElementSibling.lastElementChild as any).focus();

    // (event.previousElementSibling.firstElementChild as any).focus();
  }

  back() {
    this.state = 'send';
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     (document.getElementById(this.inputs[0].id) as any).setFocus();
  //   }, 100);
  // }
  register() {
    localStorage.setItem('number_user', this.send.phone);
    if (this.state === 'send') {
      if (this.authProvider.credentialsCheck(this.send)) {
        this.authProvider.send(this.send)
          .subscribe(success => {
              this.state = 'verify';
              this.verify.phone = this.send.phone;
              this.verify.code = success['data'].substr(-4);
              // setTimeout(() => {
              //   (document.getElementById('input1') as any).setFocus();
              // }, 100);
            },
            err => {
            })
      }
    } else {
      this.authProvider.verify(this.verify)
        .subscribe(
          success => {
            if (success['user']) {
              localStorage.setItem('token', success['token']);
              localStorage.setItem('user_id', success['user']['id']);
              this.user = success['user'];
              this.state = 'facebook';
            } else {
              this.checkRegister = false;
              this.state = 'facebook';
            }
          },
          err => {
            console.log(err)
          }
        )
    }
  }


  getFacebookData() {
    this.facebookProvider.facebookData()
      .then(res => {
        if (!this.checkRegister) {
          this.user = res;
          this.user.phone = this.verify.phone;
          this.user.code = this.verify.code;
          this.user.link = "https://www.facebook.com/profile.php?id=" + res['facebook_id'];

          //       this.user.phone = this.verify.phone;
          //       this.user.code = this.verify.code;
          //       this.user.facebook_id = "298";
          //       this.user.link = "https://www.facebook.com/profile.php?id=888";
          //       this.user.avatar_url = "https://purr.objects-us-east-1.dream.io/i/img_20171211_191901.jpg";
          // console.log('user:', this.user);

          this.userProvider.setUser(this.user);
          this.navCtrl.push(ProfilePage, {state: 'first'});
        } else {
          this.navCtrl.setRoot(MainPage, {user: this.user});
        }
      });
  }


}
