import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Vignette } from '../models/vignette';
import 'rxjs/operators';
import 'rxjs/operators';

@Injectable()
export class VignetteService {

    constructor(private http: Http) {
    }

    getVignettes(searchCriteria:any) : Observable<Vignette[]>{
             let params: URLSearchParams = new URLSearchParams();
             params.set('name', searchCriteria);
        return this.http.get("https://groupthinktv.herokuapp.com/getVignettes", { search: params })
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                });
    }

    insertNewVignette(vignette:Vignette): Observable<any>{
        return this.http.post("https://groupthinktv.herokuapp.com/insertNewVignette", vignette)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }

    updateVignette(vignette:Vignette): Observable<any>{
      console.log(vignette)
        return this.http.post("https://groupthinktv.herokuapp.com/updateVignette", vignette)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }

    deleteVignette(vignette:Vignette): Observable<any>{
      console.log(vignette._id)
        return this.http.post("https://groupthinktv.herokuapp.com/deleteVignette", { id: vignette._id })
        .map((res:any) => {
            return res.json();
        })
        .catch((error:any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error')
        });
    }
}
