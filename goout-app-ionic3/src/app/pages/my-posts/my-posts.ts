import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PostProvider} from "../../shared/providers/post.provider";
import {NewPostPage} from "../new-post/new-post";
import {EventDetailsPage} from "../event-details/event-details";

@IonicPage()

@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {

  public myPosts: any = [];
  public state: string;
  public lineFromPost: any = {};
  public names: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postProvider: PostProvider) {
    this.lineFromPost = this.navParams.get('line_id');
    this.names = this.navParams.get('names');
    this.state = this.navParams.get('state');
    console.log(this.state);
    this.getLines();
  }

  ionViewDidEnter() {
    this.getLines();
  }

  openDetails(data: any) {
    this.navCtrl.push(EventDetailsPage, {id: data.id, state: this.state});
  }

  getLines() {
    this.postProvider.getMy()
      .subscribe(success => {
        let data = success['data'];
        this.myPosts = data.filter( item => {
          if(item.line.id === this.lineFromPost){
            return item;
          }
        })
      });
  }

  newPost() {
    this.navCtrl.push(NewPostPage, {data: this.myPosts[0].line, state: "create"})
  }

}
