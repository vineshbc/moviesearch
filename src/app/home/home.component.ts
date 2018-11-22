import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies = [];
  public errorMessage='';
  public searchItems = [];
  movieSearchForm: FormGroup;
  constructor(private movieservice:MovieService,private router: Router) {
    this.searchItems = JSON.parse(window.localStorage.getItem('recentSearches'));
    if(!this.searchItems){
      window.localStorage.setItem('recentSearches', JSON.stringify([]));
    }
  }
  getMovies(searchCriteria, isRecent) {
    if(searchCriteria.title || searchCriteria.year){
      this.router.navigate(['/view', searchCriteria]);
    } else {
      this.errorMessage = 'Please enter search term!';
    }
  }

  clearFields() {
    this.movieSearchForm.reset();
    this.errorMessage = '';
  }
   

  ngOnInit() {
    this.movieSearchForm = new FormGroup({
      title: new FormControl(),
      year: new FormControl()
    });
  }
  }


