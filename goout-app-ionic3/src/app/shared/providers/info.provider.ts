import {Injectable} from "@angular/core";
import {RequestProvider} from "./request.provider";
import {ToastController} from "ionic-angular";
import {EntityProvider} from "./base/entity.provider";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()

export class InfoProvider extends EntityProvider {

    constructor(public request: RequestProvider,
                public toast: ToastController,) {

        super(request, toast);
        this.provider_name = 'staticText';

    }


    getAboutText() {
        const url = this.url('about');
        return this.request.get(url, null);
    };
    getTermsText() {
        const url = this.url('terms');
        return this.request.get(url, null);
    };



}