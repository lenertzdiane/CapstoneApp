import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Standalone } from '../models/standalone';
import 'rxjs/operators';
import 'rxjs/operators';

@Injectable()
export class StandaloneService {

    constructor(private http: Http) {
    }

    getStandalones(searchCriteria:any) : Observable<Standalone[]>{
      let params: URLSearchParams = new URLSearchParams();
      params.set('name', searchCriteria);

        return this.http.get("https://groupthinktv.herokuapp.com/getStandalones", { search: params })
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                });
    }

    insertNewStandalone(standalone:Standalone): Observable<any>{
        return this.http.post("https://groupthinktv.herokuapp.com/insertNewStandalone", standalone)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }
}
