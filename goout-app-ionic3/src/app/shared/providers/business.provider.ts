import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";

@Injectable()

export class BusinessProvider extends EntityProvider {

  provider_name: string;
   idBusiness: any;

  constructor(public request: RequestProvider,
              public toast: ToastController) {

    super(request,toast);
    this.provider_name = 'business';
  }
  setIdBusiness(id){
    this.idBusiness = id;
    console.log(this.idBusiness)
  }
  getMy(data: Object = null){
    const url = this.url('my');
    return this.request.get(url,data);
  }

  getAll(data: Object = null) {
    const url = this.url('all');
    return this.request.get(url,data);
  }

  updateBusiness(data: any){
    const url = this.url('update');
    return this.request.post(url,data);
  }

  createBusiness(data: any) {
    const url = this.url('create');
    return this.request.post(url,data);
  }

  credentialCheck(data: any, state: string) {
    if (!data.name) {
      const msg = this.msg('name');
      console.log(msg);
      this.notification('error', msg);
      console.log("name");
      return false;
    } else if(!data.location){
      const msg = this.msg('location');
      this.notification('error', msg);
      console.log("location");
      return false;
    } else if(!data.photo && state === 'create'){
      const msg = this.msg('photo');
      this.notification('error', msg);
      console.log("photo");
      return false;
    } else if(data.business_category_id === null){
      const msg = this.msg('category');
      this.notification('error', msg);
      return false;
    } else if(data.sub_business_category_id === null){
      const msg = this.msg('subcategory');
      this.notification('error', msg);
      return false;
    }
    return true;
  }

}
