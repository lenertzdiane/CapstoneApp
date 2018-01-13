import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Standalone } from '../models/standalone';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StandaloneService {

    constructor(private http: Http) {
    }

    getStandalones(searchCriteria:any) : Observable<Standalone[]>{

        return this.http.get("http://localhost:3000/getStandalones")
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                });
    }

    insertNewStandalone(standalone:Standalone): Observable<any>{
        return this.http.post("http://localhost:3000/insertNewStandalone", standalone)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }
}
