import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LinesProvider} from "../../shared/providers/lines.provider";
import moment from 'moment'
import {NewLinePage} from "../new-line/new-line";
import {MyPostsPage} from "../my-posts/my-posts";
import {NewPostPage} from "../new-post/new-post";
import {NotificationProvider} from "../../shared/providers/notification.provider";

@IonicPage()

@Component({
  selector: 'page-my-lines',
  templateUrl: 'my-lines.html',
})
export class MyLinesPage {

  public business_id: any;

  public businessName: string;

  public state: string;

  public myLines: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private linesProvider: LinesProvider,
              public events: Events,
              public notification: NotificationProvider) {
    this.business_id = this.navParams.get('business_id');
    this.businessName = this.navParams.get('business_name');
    this.state = this.navParams.get('state')
  }

  ionViewDidEnter() {
    this.getLines();
  }


  getLines() {
    this.linesProvider.getAll().subscribe(success => {
      const data = success['success'];
      this.myLines = data.filter(item => {
        if (item.business_id === this.business_id) {
          item.time = moment(item.time, "HH:mm:ss").format('HH:mm');
          item.date = moment(item.date).format('YYYY/MM/DD');
          return item;
        }
      })
    });
  }

  toPosts(data: any) {
    let names = {
      businessName: this.businessName,
      lineName: data.name
    };
    console.log(data);
    if (data.post.length) {
      this.navCtrl.push(MyPostsPage, {line_id: data.id, state: this.state,names: names})
    } else if(this.state === 'myBusiness'){
      this.navCtrl.push(NewPostPage, {data: data, state: "create"})
    } else {
      this.notification.error('This line not have a posts')
    }
  }

  editLine(data: any) {
    console.log(data);
    this.navCtrl.push(NewLinePage, {line: data, state: "edit"})
  }

  toLines() {
    this.navCtrl.push(NewLinePage, {business_id: this.business_id, state: "create"});
  }

}
