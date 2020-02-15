import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class FavoritesProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'favorites';
  }

  getFavorites(data: Object = null){
    const url = this.url('all');
    return this.request.get(url,data);
  }

  addFavorite(data: any) {
    const url = this.url('add');
    return this.request.post(url,data);
  }
}
