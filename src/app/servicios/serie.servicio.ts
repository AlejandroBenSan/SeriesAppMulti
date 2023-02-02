import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Constantes } from '../modelos/Constantes';

@Injectable({
    providedIn: 'root'
  })

  export class SerieServicio {

    url: string = Constantes.HOST;
  
    constructor(private http: HttpClient) {
    }
  
    getSeries()
    {
      return this.http.get(this.url + '/api/series');
    }
  
    getSerie(id:string){
      return this.http.get(this.url + '/api/serie/' + id)
    }
  }