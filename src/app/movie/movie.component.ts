import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  section = 9;
  title: string = '';
  year: number = 0;
  beforeYear: number = 0;
  selectedActor = null;
  selectedMovie = null;
  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = '';
    this.year = 0;
    this.beforeYear = 0;
    this.selectedActor = null;
    this.selectedMovie = null;
  }
  changeSelectedActor(item) {
    this.selectedActor = item;
  }
  changeSelectedMovie(item) {
    this.selectedMovie = item;
  }

  //Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Get all actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe((result) => {
      this.onGetMovies();
    });
  }

  //Delete Movies before year
  onDeleteMovies() {
    this.dbService.deleteMovies(this.beforeYear).subscribe((result) => {
      this.onGetMovies();
    });
  }
  //Add Movie
  onSaveMovie() {
    let obj = { title: this.title, year: this.year, actors: [] };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.onGetMovies();
    });
  }

  onSavingActorToMovie() {
    this.dbService
      .addActorToMovie(this.selectedMovie._id, this.selectedActor)
      .subscribe((result) => {
        this.onGetMovies();
        this.onGetActors();
      });
    this.selectedActor = null;
    this.selectedMovie = null;
  }
}
