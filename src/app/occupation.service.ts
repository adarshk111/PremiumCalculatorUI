import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { UserForm } from './user-form';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  _headers : HttpHeaders
  baseUrl : string = environment.baseAPIUrl
  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders({'Content-Type' : 'application/json'})
   }

  getOccupationList() : Observable<string[]>{
    const occupationList : string[] = [  
        'Cleaner', 'Doctor', 'Author', 'Farmer', 'Mechanic', 'Florist'
    ]
    return this.http.get<string[]>(this.baseUrl + "/api/Occupation/GetOccupationList")
  }

  GetCalculatedPremium(userdetails : UserForm) : Observable<number>{
    return this.http.post<number>(this.baseUrl + "/api/Occupation/GetPremium", JSON.stringify(userdetails),{headers : this._headers, responseType : 'json'})
  }
}