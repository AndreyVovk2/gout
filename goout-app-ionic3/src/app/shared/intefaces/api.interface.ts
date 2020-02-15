import {Observable} from "rxjs";

export declare interface Api {
    post(url: string, data: Object): Observable<any>;

    get(url: string, data: Object): Observable<any>;

    put(url: string, data: Object): Observable<any>;
}