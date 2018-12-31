import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: InfoEquipo[] =  [];
  todoBien = false;

  constructor(private http: HttpClient) {

    console.log('Servicio al tiro!!!');

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {

    // Leer arvhivo JSON
    this.http.get('assets/data/data-pagina.json')
            . subscribe( (resp: InfoPagina) => {

              this.todoBien = true;
              this.info = resp;
              console.log(this.info);

              // console.log(resp['twitter']);  Haciendo referencia a una propiedad del objeto
              console.log(resp.email); // Usando una interface para poder usar sus propiedades en codigo

            });
  }

  private cargarEquipo() {

    this.http.get('https://angular-html-1eee0.firebaseio.com/equipo.json')
             .subscribe( (resp: InfoEquipo[]) => {
               this.equipo = resp;
               console.log(this.equipo);
             });
  }
}
