import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private baseUrl = environment.apiBaseUrl;
    private selectedCharacterSubject = new BehaviorSubject<any>(null); // Aquí almacenamos el personaje seleccionado
    selectedCharacter$ = this.selectedCharacterSubject.asObservable(); // Este observable será consumido por otros componentes
    
    constructor(private http: HttpClient) {}
  
    setSelectedCharacter(character: any) {
        this.selectedCharacterSubject.next(character);
    }
    getCharacters(page: number = 1): Observable<any> {
      return this.http.get(`${this.baseUrl}?limit=20&page=${page}`);
    }
  
    getCharacterById(name: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/find/${name}`);
    }
}