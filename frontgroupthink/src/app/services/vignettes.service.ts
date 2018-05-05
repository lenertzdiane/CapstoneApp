import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Vignette } from '../models/vignette';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VignetteService {

    constructor(private http: Http) {
    }

    getVignettes(searchCriteria:any) : Observable<Vignette[]>{
             let params: URLSearchParams = new URLSearchParams();
             params.set('name', searchCriteria);
        return this.http.get("http://localhost:3000/getVignettes", { search: params })
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                });
    }

    insertNewVignette(vignette:Vignette): Observable<any>{
        return this.http.post("http://localhost:3000/insertNewVignette", vignette)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }

    updateVignette(vignette:Vignette): Observable<any>{
      console.log(vignette)
        return this.http.post("http://localhost:3000/updateVignette", vignette)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            });
    }

    deleteVignette(vignette:Vignette): Observable<any>{
      console.log(vignette._id)
        return this.http.post("http://localhost:3000/deleteVignette", { id: vignette._id })
        .map((res:any) => {
            return res.json();
        })
        .catch((error:any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error')
        });
    }
}
