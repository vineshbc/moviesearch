import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http:HttpClient) {}
   // Uses http.get() to load data from a single API endpoint
 
   getMovies(searchCriteria) {
    if(searchCriteria && (searchCriteria.title || searchCriteria.year)){
        const apiURL = `http://www.omdbapi.com/?s=${searchCriteria.title}&y=${searchCriteria.year}&apikey=933329b`;
        return this.http.get(apiURL);
        
    } else {
        throw new Error('Nothing to search!');
    }
}
}