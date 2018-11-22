import { Component, OnInit, ViewContainerRef } from '@angular/core';
// importing route related code

import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from './../movie.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public movies = [];
  protected sub;
  protected movieSub;
  public errorMessage = '';
  public isLoading = false;
 
  
  constructor(private movieservice: MovieService, private route: ActivatedRoute) { 
    
    this.isLoading = true;
        let sub = this.route.params.subscribe(params => {
            this.movieSub = this.movieservice.getMovies(params).subscribe(
              data => {
                console.log(data);
                if (data['Response'] === 'True') {
                    const searchItems = JSON.parse(window.localStorage.getItem('recentSearches'));
                    searchItems.unshift({
                        title: (params.title !== 'null') ? params.title : '',
                        year: (params.year !== 'null') ? params.year : ''
                       
                    });
                    if(searchItems.length > 5) {
                        searchItems.splice(5);
                    }
                    window.localStorage.setItem("recentSearches", JSON.stringify(searchItems));
                    this.movies = data['Search'];
                    console.log(this.movies);
                    setTimeout(() => {this.isLoading = false;}, 2000);
                } else {
                    this.errorMessage = data['Error'];
                    this.isLoading = false;
                }
            })
        });
  }


  ngOnInit() {

    
  }
}
