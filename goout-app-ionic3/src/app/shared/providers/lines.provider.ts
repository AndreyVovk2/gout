import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class LinesProvider extends EntityProvider {

  provider_name: string;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request, toast);
    this.provider_name = 'lines';
  }

  getAll(data: Object = null){
    const url = this.url('all');
    return this.request.get(url,data);
  }

  createLine(data: any) {
    const url = this.url('create');
    return this.request.post(url,data);
  }

  updateLine(data:any, id: number) {
    const url = this.url('update');
    return this.request.put(url + id,data);
  }

}
