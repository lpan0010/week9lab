import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
})
export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName: string = '';
  bYear: number = 0;
  actorId: string = '';
  title: string = '';
  year: number = 0;
  beforeYear: number = 0;
  selectedActor = null;
  selectedMovie = null;
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear, movies: [] };
    this.dbService.createActor(obj).subscribe((result) => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe((result) => {
      this.onGetActors();
    });
  }
  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe((result) => {
      this.onGetActors();
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
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
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
}
