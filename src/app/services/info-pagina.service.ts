import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  todoBien = false;

  constructor(private http: HttpClient) {

    console.log('Servicio al tiro!!!');

    // Leer arvhivo JSON
    this.http.get('assets/data/data-pagina.json')
            . subscribe( (resp: InfoPagina) => {

              this.todoBien = true;
              this.info = resp;
              console.log(resp);

              // console.log(resp['twitter']);  Haciendo referencia a una propiedad del objeto
              console.log(resp.email); // Usando una interface para poder usar sus propiedades en codigo

            });
  }
}
