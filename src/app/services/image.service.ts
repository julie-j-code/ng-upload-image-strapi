import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  url = 'http://localhost:1337/upload';

  // constructeur qui met en jeu l'injection de dépendances d'angular
  constructor(private http: HttpClient) {}

  // FormData est un type fourni nativement depuis déjà plusieures années

  uploadImage(formData: FormData): Observable<any> {
    return this.http
      .post(this.url, formData)
      // pipe est une méthode qui permet d'appeler différents opérateurs rxjs
      .pipe(tap(() => console.log(formData)));
  }
}
