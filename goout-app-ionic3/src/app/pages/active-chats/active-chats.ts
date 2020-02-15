import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatRoomComponent} from "../../shared/components/chat-room/chat-room.component";
import {ChatsProvider} from "../../shared/providers/chats.provider";
import {AngularFireDatabase} from "angularfire2/database";
import {UserProvider} from "../../shared/providers/user.provider";
import moment from "moment";
import {FirebaseProvider} from "../../shared/providers/firebase.provider";
import {TranslateService} from "@ngx-translate/core";
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";


@IonicPage()
@Component({
  selector: 'page-active-chats',
  templateUrl: 'active-chats.html',
})
export class ActiveChatsPage implements OnInit {
  seachValue: string;
  user: any = {};
  chats: any = [];
  chatPair: string;
  users: any = [];
  search = '';
  usersChat: any = [];
  usersChatCopy: any = [];
  chatTitle: string = '';
  searchText: string = '';
  userf: any;
  @Input() public searchosts: any = [];
  search$: Observable<any>;
  @ViewChild('search') input: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private chatsProvider: ChatsProvider,
              private userProvider: UserProvider,
              public firebase: FirebaseProvider,
              public translate: TranslateService) {
    moment.locale('he');
  }

  ngOnInit() {
    console.log(this.searchText);
    this.chatTitle = this.translate.instant('chat.header');
    this.getUsers();
// console.log(this.users);
    const chatCollection = this.db.list('chats/' + localStorage.user_id);
    chatCollection.valueChanges().subscribe(chat => {
    });
    console.log(this.usersChat);
    this.filter();
  }

  filter() {
    this.search$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        debounceTime(500),
        distinctUntilChanged(
        ));
    this.search$.subscribe((val: string) => {
      this.usersChat = this.usersChatCopy.filter(item => {
        if (item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
          return item;
        }
      })
    });
console.log(this.usersChatCopy)
  }

  getUsers() {
    this.userProvider.getAll()
      .subscribe(data => {
        this.users = data;
        const ids = this.db.list('chats/' + 'ids/' + localStorage.user_id);
        ids.valueChanges()
          .subscribe(idss => {
            this.getData(idss);
            // this.usersChat = idss;
            this.getChats(idss);
            this.getOnline();
            console.log(this.usersChat);
            this.usersChatCopy = this.usersChat;
          });
      });
    this.userProvider.getMe()
      .subscribe(data => {
        this.user = data;
      })
  };

  getOnline() {
    this.db.list('users/')
      .valueChanges()
      .subscribe(users => {
        users.forEach(dbUser => {
          this.usersChat.forEach(partner => {
            if (partner['id'] === dbUser['id']) {
              partner['status'] = dbUser['status'];
            }
          })
        })

      });
  }

  getData(ids) {
    ids.forEach(id => {
      this.users.forEach(user => {
        if (id === user.id) {
          this.usersChat.push(user);
        }
      })
    });
  }

  getChats(ids) {
    ids.forEach(partnerId => {
      this.usersChat.forEach(user => {
        user.messages = [];
        let id;
        if (this.user.id > partnerId) {
          id = this.user.id;
        } else {
          id = partnerId;
        }
        user.lastMessageDate = {
          year: null,
          day: null,
          month: null
        };
        this.chatPair = this.chatsProvider.setChatPair(this.user.id, partnerId);
        const chatCollection = this.db.list('chats/' + id + '/' + this.chatPair);
        chatCollection.valueChanges()
          .subscribe(chat => {
            user.messages = chat;
            if (user.id === partnerId) {
              let day = new Date().getDate();
              if (user.lastMessage = user.messages[user.messages.length - 1].message !== undefined) {
                user.lastMessage = user.messages[user.messages.length - 1].message;
                user.lastMessageDate = user.messages[user.messages.length - 1].date;
                if (user.messages[user.messages.length - 1].day === day) {
                  user.lastMessageTime = moment(user.messages[user.messages.length - 1].time).format("HH:mm");
                } else {
                  user.lastMessageTime = moment(user.messages[user.messages.length - 1].time).fromNow()
                }
                user.noCheckedMessages = 0;
                user.messages.forEach(message => {
                  if (message.checked === false && message.senderId === user.id) {
                    user.noCheckedMessages += 1;
                  }
                });
                user.partnerMessages = true;
                user.messages.forEach(message => {
                  if (message.checked === false && message.senderId !== user.id) {
                    user.partnerMessages = false;
                  }
                });
              }
            }
          });
      });
    });
  }

  checkDateMessage(date: any) {

  }

  openChat(chatpartner) {
    this.chatsProvider.user = this.user;
    this.chatsProvider.event.creator.id = chatpartner.id;
    this.chatsProvider.initialize();
    this.navCtrl.push(ChatRoomComponent, {event: this.chatsProvider.event, partner: chatpartner, user: this.user});
  }

}
