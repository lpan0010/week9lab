import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get('/actors');
  }
  getMovies() {
    return this.http.get('/movies');
  }
  getActor(id: string) {
    let url = '/actors/' + id;
    return this.http.get(url);
  }
  createActor(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/actors', data, httpOptions);
  }
  createMovie(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/movies', data, httpOptions);
  }
  updateActor(id, data) {
    let url = '/actors/' + id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = '/actors/' + id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete(url, httpOptions);
  }
  deleteMovie(id) {
    let url = '/movies/' + id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete(url, httpOptions);
  }
  deleteMovies(year) {
    let url = '/movies/';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { year: year },
    };
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(movieId, actor) {
    let url = `/movies/${movieId}/actors`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(url, actor, httpOptions);
  }
}
