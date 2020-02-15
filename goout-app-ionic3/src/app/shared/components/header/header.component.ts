import {Component, Input, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {FavoritesProvider} from "../../providers/favorites.provider";

@Component({
  templateUrl: 'header.html',
  selector: 'custom-header'
})

export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() eventId: number = 0;
  public favorite: boolean = false;
  public favoritesList: any = [];

  constructor(public navCtrl: NavController,
              public favoritesProvider: FavoritesProvider){
  }

  ngOnInit(){
    this.checkFavorites()
  }

  checkFavorites(){
    this.favoritesProvider.getFavorites()
      .subscribe(success =>{
        this.favoritesList = success['data'];
        this.favoritesList.forEach(favorite => {
          if(this.eventId === favorite.id){
           this.favorite = true;
         }
        });
      })
  }

  changeIcon(){
    const data = {
      post_id: this.eventId
    };
    if(this.favorite){
      this.favoritesProvider.addFavorite(data).
        subscribe( success => {
      });
      this.favorite = false
    } else {
      this.favoritesProvider.addFavorite(data).
      subscribe( success => {
      });
      this.favorite = true
    }
  }

  goBack(){
    this.navCtrl.pop();
  }

}
