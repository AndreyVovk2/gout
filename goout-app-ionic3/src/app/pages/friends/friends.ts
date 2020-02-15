import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FacebookProvider} from "../../shared/providers/facebook.provider";
import {UserProvider} from "../../shared/providers/user.provider";
import {Contacts, ContactFieldType} from '@ionic-native/contacts';
import {Base64} from "@ionic-native/base64";
import {DomSanitizer} from "@angular/platform-browser";
import {NotificationProvider} from "../../shared/providers/notification.provider";
import {FriendsProvider} from "../../shared/providers/friends.provider";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";
import {isSuccess} from "@angular/http/src/http_utils";


@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
  animations: [
    trigger('popInvite', [
      state('show', style({
        bottom: '15px'
      })),
      state('hide', style({
        bottom: '-50px'
      })),
      transition('hide<=>show', animate('0.15s ease-out'))
    ])

  ]
})
export class FriendsPage {

  public tab: string = 'all';
  public friends: any = [
  ];
  public allFriends: any = [];
  public friendsFromBusiness: any = [];
  public infoText: string = 'friends.load';
  public type: string;
  public title: string;
  public modalWindow: boolean  = false;
  public selectPersonId: any;
  public chosenRoles: any;
  public slice: number = 15;
  public searchFields: any = ['name', 'lastname'];
  public showSelectAll: boolean = true;
  public searchStr: string;
  public userId: any;
  public lineId: any;
  public stateAnimateInvite: string = 'hide';
  public inviteCounter: number = 0;


  constructor(public navCtrl: NavController,
              private facebookProvider: FacebookProvider,
              private userProvider: UserProvider,
              public navParams: NavParams,
              public events: Events,
              public translate: TranslateService,
              private contacts: Contacts,
              private base64: Base64,
              private sanitizer: DomSanitizer,
              public platform: Platform,
              private notification: NotificationProvider,
              private friendsProvider: FriendsProvider) {
  }


  ionViewDidLoad() {
    this.setParams();
    this.getFriend();

    console.log(this.friends)
  }

  setParams(){
    this.type = this.navParams.get('type');
    // this.type = 'phone';
    this.chosenRoles = this.navParams.get('chosenRoles');
    this.friendsFromBusiness = this.navParams.get('friends');
    console.log(this.friendsFromBusiness);
    this.lineId = this.navParams.get('lineId');

    this.title = this.getTitle(this.type);
  }

  getTitle(type) {
    switch (type) {
      case 'friend':
        return 'friends.title-friend';
      case 'blogger':
        return 'friends.title-blogger';
      case 'hostess':
        return 'friends.title-hostess';
      case 'phone':
        return 'friends.title-phone';
    }
  }

  getFriend() {
    switch (this.type) {
      case 'friend':
        this.getAccessToken();
        break;
      case 'blogger':
        // this.getAccessToken();
        this.getFriendFromBusiness();
        break;
      case 'hostess':
        // this.getAccessToken();
        this.getFriendFromBusiness();
        break;
      case 'phone':
        this.getPhoneContact();
        break;
    }
  }



  getAccessToken() {
    this.facebookProvider.getLoginStatus()
      .then((res) => {
        console.log(res.authResponse.accessToken);
        this.getFBFriends(res.authResponse.accessToken);
      })
      .catch((err) => console.log(err));
    // let accessToken = 'EAAG4OEqQeHUBANOuOWFBxyzPkiX89r1aq1S4TqUgPmvOnSO4kvayXnpjynU2wcBIrAy50QxWgEsDu3ZA32cHNWkI0cBgIv9fKqqwjMMEsqhJhvZCZCAn0vfvvAqaYpudMhEPwAeKhDPn2zetALGKmGZCwE4hcZBviZBuf7NeZC8hNwZCg80VmRxRcNnVuM9JZBsfDHOXnsCpY7xumNmcZBqYpJmRWlrQhamyQK7WRPF3sXe1bZBA2Nu7XgmlrPme9UvWgYZD'
    // this.getFBFriends(accessToken)
  }

  /** This method does not work well for the browser.**/
  // getAccessToken2() {
  //   this.facebookProvider.getAccessToken()
  //     .then((res) => {
  //       console.log('acess 2');
  //       console.log(res);
  //       this.getFBFriends(res);
  //     })
  //     .catch((err) => console.log(err))
  //   // let accessToken = 'EAAG4OEqQeHUBALsg2UGtYpydVKnw8qIvpQEnZBTd1VVLQlWZBnh9SuhCDevn2HQZBVDvkjmKCbXGrHlUSJcQLWwJx3JuCnVv9bVQitDnIkrpHbTL4xOto2D2USGAw9J2EmtzGqKpRL6eYeBpWUaKOVpFbXkg6IeuTEIHk4Q74k2JZBhEmBV2XgxJG3mrxBwJNqqRBbuPqwZDZD'
  //   // this.getFBFriends(accessToken)
  // }

  getFBFriends(accessToken) {
    let data = {access_token: accessToken};
    this.userProvider.getFbFriends(data)
      .subscribe(success => {
        console.log(success);
        this.friends = success;
        this.allFriends = success;
        this.setInfoText();
        this.setInviteFriend();
        console.log(data);
        console.log(accessToken);
      }, (err) => {
        this.infoText = 'Server error';
      });
  }

  getFriendFromBusiness(){
    console.log("getFriendFromBusiness-------------------------");
    if (Array.isArray(this.friendsFromBusiness)) {
      this.friends = this.friendsFromBusiness.map((i) => {
        return JSON.parse(JSON.stringify(i));
      });
    }
    this.setInfoText();
    this.setInviteFriend();
  }

  change() {
    switch (this.tab) {
      case 'all':
        this.friends = this.allFriends;
        break;
      case 'confirm':
        this.friends = this.allFriends.slice(1);
        break; // replace slice to filter
      case 'party':
        this.friends = this.allFriends.slice(3);
        break; // replace slice to filter
    }
    this.setInfoText()
  }


  setInfoText() {
    if (this.friends.length > 0) {
      this.infoText = '';
    } else {
      this.infoText = 'friends.no-friend';
    }

  }



  showModal (personId) {
    this.selectPersonId = personId;
    this.modalWindow = true;
  }

  closeModal(modalStatus){
    this.modalWindow = false;
    if (modalStatus){
      this.addRolePerson();
    }
  }

  setInviteFriend(){
    for (let i in this.chosenRoles){
      let chosenRoles = this.chosenRoles[i];
      for (let i in this.friends) {
        if (this.friends[i]['id'] === chosenRoles){
          this.friends[i]['role'] = true;
        }
      }
    }
  }

  addRolePerson(){
    this.events.publish('select:role', this.selectPersonId, this.type);
    for (let i in this.friends) {
      if (this.friends[i]['id'] === this.selectPersonId){
        this.friends[i]['role'] = true;
        break;
      }
    }
  }


  getPhoneContact(): void {
    let contactPhoneList = [];

    let fields:ContactFieldType[] = ["displayName", "phoneNumbers", "photos"]; //return this fields
    // var fields = ["*"]; // for get all field
    let options =  {
      multiple: true,
      hasPhoneNumber: true
    }; //options of searching

    // this.hardCodeContacts(100);
    // console.log( this.platform.is('core'));

    this.contacts.find(fields, options).then((contacts) => {
      for (var i=0 ; i < contacts.length; i++){
        if(contacts[i].displayName !== null) {
          var contact = {};
          contact["name"]   = contacts[i].displayName;
          //Add photo from phone( need to fix bug)
          // if(contacts[i].photos != null) {
          //   console.log(contacts[i].photos);
          //   contact["avatar_src"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
          //   console.log(contact);
          // } else {
          //   contact["avatar_src"] = "assets/icon/noavatar.png";
          // }
          contact["avatar_src"] = "assets/icon/noavatar.png";

          contact["number"] = contacts[i].phoneNumbers[0].value;
          let number = this.friendsProvider.filterPhone(contacts[i].phoneNumbers[0].value);
          if(number){
            contact["number"] = number;
            contactPhoneList.push(contact);
          }
        }
      }
      this.friends = contactPhoneList;
      this.setInfoText();
    });

    this.getUserStorageId();

  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.slice += 50;
      infiniteScroll.complete();
    }, 100);
  }

  hardCodeContacts(numberContacts){
    let contactPhoneList = [];
    //Hard code contact
    for (let i=0 ; i < numberContacts; i++){
      let contact = {};
      contact["name"]   = 'Name' + i + ' LastName' + i;
      contact["number"] = '+38000000000' + i;
      contact["avatar_src"] = "assets/icon/noavatar.png";
      contact["desired"] = {des: i+i+i};
      // setTimeout(()=>{
      //   this.friends.push(contact);
      //   if(i === 0){
      //     this.setInfoText();
      //   }
      // }, i*100)
      contactPhoneList.push(contact);


    }
    setTimeout(()=>{
      this.friends = contactPhoneList;
      this.setInfoText();
    }, 500)




  }

  sendPhoneContact(){
    let sendPhones: any = [];

    this.friends.forEach((item)=>{
      if(item.phone_status === true){
        sendPhones.push(item.number);
      }
    });

    let sendPhones1 = sendPhones;
    sendPhones = this.friendsProvider.filterSendPhones(sendPhones); // only for testing numbers 066 - xxx-xxxx



    // if(sendPhones.length){
    if(sendPhones1.length){ // only for testing numbers 066 - xxx-xxxx
      let sendData = {
        user_id: this.userId,
        line_id: this.lineId,
        phones: sendPhones
      }
      console.log(sendData);


      this.notification.success(this.translate.instant('friends.contact-send'));
      this.navCtrl.pop();

    } else {
      this.notification.error('No contacts selected');
    }

  }

  selectAll(){
    this.friends = this.friends.map((item)=>{
      item.phone_status = true;
      return item});
    this.searchStr = '';
    this.showSelectAll = false;
    this.stateAnimateInvite = 'show';
    this.inviteCounter = this.friends.length
  }

  cancelAll(){
    this.friends = this.friends.map((item)=>{
      item.phone_status = false;
      return item});
    this.searchStr = '';
    this.showSelectAll = true;
    this.stateAnimateInvite = 'hide';
    this.inviteCounter = 0;
  }

  getUserStorageId() {
    this.userId =  this.userProvider.getUserStorageId();
  }

  showInvitePhone(status){
    let numberStatus = status ? 1 : -1;
    this.inviteCounter = this.inviteCounter + numberStatus;
    if(this.inviteCounter > 0){
      this.stateAnimateInvite = 'show';
    } else {
      this.stateAnimateInvite = 'hide';
    }

  }


















}
