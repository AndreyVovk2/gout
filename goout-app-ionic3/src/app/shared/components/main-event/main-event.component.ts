import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import moment from 'moment'
import {PostProvider} from "../../providers/post.provider";
import {NavController} from "ionic-angular";
import {FavoritesProvider} from "../../providers/favorites.provider";
import {EventDetailsPage} from "../../../pages/event-details/event-details";

@Component({
  templateUrl: 'main-event.html',
  selector: 'main-event'
})

export class MainEventComponent implements OnInit {
  @Input() event: any;
  @Output() public save = new EventEmitter<string>();

  public favorite: boolean = false;
  public userId: number;
  public way: string;

  constructor(private postProvider: PostProvider,
              public navCtrl: NavController,
              private favoritesProvider: FavoritesProvider) {
  }

  ngOnInit() {
    // if (this.event.favorite) {
    //   this.favorite = this.event.favorite;
    // } else {
    //   this.favorite = false;
    // }
    this.event.date =this.event.created_at.substr(8, 2)+ "/"  + this.event.created_at.substr(5, 2) + "/" + this.event.created_at.substr(2, 2);
    this.event.time = this.event.created_at.substr(11, 5);
    this.userId = +localStorage.getItem('user_id');
  }

  changeStyle(data: boolean) {
    if (data) {
      return 'linear-gradient(to top, #6c5264 0%, #000000 100%)';
    } else {
      return 'linear-gradient(to top, rgba(108, 82, 100, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)';
    }
  }

  addFavorite() {
    const data = {
      post_id: this.event.id
    };
    this.favoritesProvider.addFavorite(data)
      .subscribe(success => {
        console.log(success);
        if (this.event.favorite) {
          this.event.favorite = false;
          this.save.emit('false')
        } else this.event.favorite = true;
      });
  }


  checkRoles(event) {
    if (event.publicist.requested.some(item => item.id === this.userId && event.creator.id === this.userId) &&
      event.hostes.requested.some(item => item.id === this.userId && event.creator.id === this.userId)) {
      this.way = 'doubleRole'
    } else if (event.publicist.requested.some(item => item.id === this.userId && event.creator.id === this.userId)) {
      this.way = 'blogger'
    } else if (event.hostes.requested.some(item => item.id === this.userId && event.creator.id === this.userId)) {
      this.way = 'hostes'
    } else if (event.creator.id === this.userId) {
      this.way = 'owner'
    } else {
      this.way = 'user'
    }
  }

  openDetails(event: any) {
    this.checkRoles(event);
    switch (this.way) {
      case 'doubleRole':
        this.navCtrl.push(EventDetailsPage, {id: event.id, state: 'doubleRole'});
        break;
      case 'hostes':
        this.navCtrl.push(EventDetailsPage, {id: event.id, state: 'businessHostes'});
        break;
      case 'blogger':
        this.navCtrl.push(EventDetailsPage, {id: event.id, state: 'businessPublicist'});
        break;
      case 'owner':
        this.navCtrl.push(EventDetailsPage, {id: event.id, state: 'myBusiness'});
        break;
      case 'user':
        this.navCtrl.push(EventDetailsPage, {id: event.id, state: 'user'})
    }
  }

  getFavorites() {

  }
}
