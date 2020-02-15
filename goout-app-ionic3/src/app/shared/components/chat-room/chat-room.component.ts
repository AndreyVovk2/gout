import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database"
import {Chat} from "../../intefaces/chat.interface";
import {ChatsProvider} from "../../providers/chats.provider";
import {map} from 'rxjs/operators';
import {FirebaseProvider} from "../../providers/firebase.provider";
import {Keyboard} from "@ionic-native/keyboard";
import {UserProvider} from "../../providers/user.provider";
import * as moment from 'moment';
@Pipe({name: 'MomentWeek'})
export class MomentWeek implements PipeTransform {
  transform(date) {
    return moment(date).format('dddd');
  }
}
@Component({
  selector: 'chat-room',
  templateUrl: 'chat-room.html',
})

export class ChatRoomComponent implements OnInit {

  public chatPair: string;
  data = new Date();
  event: any = {
    creator: {}
  };
  user: any = {};
  chats: any = [];
  partner: any = {
    status: ''
  };
  show: boolean = true;

  scroll: boolean = false;
  time = moment(1566487059312).format('MMMM');
  message: string;
  chatPayload: Chat;
  chatSubcr: any;
  limitMessages: number = 20;

  lastMessage: number = 20;
  @ViewChild("content") content: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              public chatsProvider: ChatsProvider,
              public firebase: FirebaseProvider,
              public keyboard: Keyboard,
              public userProvider: UserProvider) {
    this.date();
    this.getMessages('begin');
  }

  ngOnInit() {
    this.keyboardOpen();
    this.keyboardClose();
    this.getPartner();
    console.log(this.time);



  }


  getPartner() {
    this.event = this.navParams.get('event');
    this.userProvider.getUserId(this.event.creator.id).subscribe(success => {
        this.partner = success['data'];
        this.db.object('users/' + this.event.creator.id)
          .valueChanges()
          .subscribe(partner => {
            this.partner.status = partner['status'];
            console.log(partner);
            this.partner.beOnline = moment(partner['date']).fromNow();
          })
      }
    )
  }

  getMessages(state: string) {
    this.event = this.navParams.get('event');
    this.user = this.navParams.get('user');
    let id;
    if (this.user.id > this.event.creator.id) {
      id = this.user.id;
    } else {
      id = this.event.creator.id;
    }
    this.chatPair = this.chatsProvider.setChatPair(this.user.id, this.event.creator.id);
    const chatCollection = this.db.list(`chats/${id}/${this.chatPair}`,
      ref => ref.limitToLast(this.limitMessages));
    this.chatSubcr = chatCollection.snapshotChanges()
      .pipe(map(items => {
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, data};
        });
      }))
      .subscribe(res => {
          this.chats = res;
          this.lastMessage = this.chats.length;
          this.chats.forEach(item => {
              if (item.data.senderId != localStorage.getItem('user_id')) {
                let data = item.data;
                data.checked = true;
                this.db.object(`chats/${id}/${this.chatPair}/${item.key}`).update(data);
              }
            }
          );
          console.log(this.chats);
          if (state === 'begin') {
            setTimeout(() => {
              this.content.scrollToBottom(0);
            }, 50)
          }
        }
      );
  }


  keyboardOpen() {
    this.keyboard.onKeyboardShow()
      .subscribe(event => {
        this.content.scrollToBottom(0)
      })
  }

  keyboardClose() {
    this.keyboard.onKeyboardHide()
      .subscribe(event => {
        this.content.scrollToBottom(0)
      })
  }


  checkToday(messDay: number, messMonth: number) {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    if (day == messDay) {
      console.log(true);
      return true
    } else {
      console.log(day, messDay);
      console.log(false);
      return false
    }
  }

  checkYesterday(messDay: any, messMonth: any) {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    if (day - 1 === messDay && month === messMonth ||
      day - 1 < 0 && messDay === 30 || 31 && month === messMonth) {
      return true
    } else {
      return false
    }
  }

  dateCheck(message: any, index: number) {
    if (index) {
      let prevMessage = moment(message[index - 1].data.time).format("EEEE");
      let currentMessage = moment(message[index].data.time).format("EEEE");
      console.log(this.chats);
      if (prevMessage !== currentMessage) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  send() {
    if (this.message && this.message !== "") {
      this.chatPayload = {
        message: this.message,
        sender: this.user.name,
        senderId: this.user.id,
        time: new Date().getTime(),
        day: new Date().getDate(),
        checked: false
      };
      this.message = '';
      this.chatsProvider.addChat(this.chatPayload, this.event.creator.id);
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 30);
    }
  }

  isChatPartner(sender) {
    if (this.user.name != sender) {
      return true;
    } else {
      return false;
    }
  }

  doInfinite(infiniteScroll) {
    infiniteScroll.position = 'top';
    setTimeout(() => {
      this.limitMessages += 10;
      this.getMessages('infinitive');
      console.log(this.lastMessage);
      console.log(this.limitMessages);
      infiniteScroll.complete();
    }, 30)
  }

  ionViewDidLeave() {
    this.chatSubcr.unsubscribe();
  }

//   getHebrew(){
//     this.chats.for Each();
// }
  date() {
    this.chats.forEach(function (element) {
      let ewr = 2;
      console.log(element);
      console.log(ewr)
    })
  }

}
