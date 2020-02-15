import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

import {Chat} from "../intefaces/chat.interface";
import {Network} from "@ionic-native/network";

@Injectable()
export class ChatsProvider {

  chatPair: string;
  ids: any = [];
  creator_ids: any = [];

  id: number;
  public user: any = {};
  public event: any = {
    creator: {}
  };


  constructor(private db: AngularFireDatabase,
              private network: Network) {

  }


  initialize() {
    this.chatPair = this.setChatPair(this.user.id, this.event.creator.id);
    const ids = this.db.list('chats/' + 'ids/' + this.user.id);
    const creator_ids = this.db.list('chats/' + 'ids/' + this.event.creator.id);
    ids.valueChanges()
      .subscribe(idss => {
      this.ids = idss;
    });
    creator_ids.valueChanges()
      .subscribe(idss => {
      this.creator_ids = idss;
    });
  }

  setChatPair(user1, user2) {
    if (user1 > user2) {
      this.id = user1;
      return user1 + '-' + user2
    } else {
      this.id = user2;
      return user2 + '-' + user1
    }
  }

  addChat(chat: Chat, id) {
    let s = false;
    let d = false;
    this.db.list('chats/' + this.id + '/' + this.chatPair).push(chat);
    this.ids.forEach(chat_id => {
      if(chat_id === id) {
        s = true;
        return
      }
    });
    this.creator_ids.forEach(chat_id => {
      if(chat_id === this.user.id) {
        d = true;
        return
      }
    });

    if (!s) {
      this.db.list('chats/' + 'ids/' + this.user.id).push(id);
    }
    if (!d) {
      this.db.list('chats/' + 'ids/' + id).push(this.user.id);
    }
  }


  /* updateTask(id, update) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    this.taskDoc.update(update);
  } //updateTask

  deleteTask(id) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    //Delete the document
    this.taskDoc.delete();
  } //deleteTask */
}
