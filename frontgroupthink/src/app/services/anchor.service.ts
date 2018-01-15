import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Anchor } from '../models/anchor';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AnchorService {

    constructor(private http: Http) {
    }

    getAnchors(searchCriteria:any) : Observable<Anchor[]>{

        return this.http.get("http://localhost:3000/getAnchors")
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                });
    }

    insertNewAnchor(anchor:Anchor): Observable<any>{
        return this.http.post("http://localhost:3000/insertNewAnchor", anchor)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }
}
