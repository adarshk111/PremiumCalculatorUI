import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { OccupationRating } from './occupation-rating';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  baseUrl : string = environment.baseAPIUrl
  constructor(private http: HttpClient) { }

  getOccupationList() : Observable<string[]>{
    const occupationList : string[] = [  
        'Cleaner', 'Doctor', 'Author', 'Farmer', 'Mechanic', 'Florist'
    ]
    return this.http.get<string[]>(this.baseUrl + "/api/Occupation")
  }
}