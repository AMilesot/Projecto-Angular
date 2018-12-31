import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosResume } from '../interfaces/productos-resume';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductosResume[] = [];
  productoDetalle: Productos[] = [];
  productosFiltrado: ProductosResume[] = [];

  constructor(private http: HttpClient) {

    // console.log('Servicio de productos Cargado al 100');
    this.cargarProductos();
    this.cargarProductosDetalle();

   }

   private cargarProductos() {
     this.cargando = true;
     return new Promise((resolve, reject) => {
      this.peticionHttp('https://angular-html-1eee0.firebaseio.com/productos_idx.json', '0');
      resolve();
     });
   }

   private cargarProductosDetalle() {
     this.cargando = true;
     this.peticionHttp('https://angular-html-1eee0.firebaseio.com/productos.json', '1');
   }

   private peticionHttp(json: string, clave: string) {

    this.http.get(json)
             .subscribe( (resp: any[]) => {

                switch (clave) {
                  case '0':
                  {
                    this.productos = resp;
                    // console.log(this.productos);
                    this.cargando = false;
                  }
                  break;

                  case '1':
                  {
                    this.productoDetalle = resp;
                    // console.log(this.productoDetalle);
                    this.cargando = false;
                  }
                  break;

                  default:
                  console.log('No hay data compatible, verifique su servicio REST');
                    break;
                }
              });
   }

    getProducto(id: string) {
     return this.http.get(`https://angular-html-1eee0.firebaseio.com/productos/${id}.json`); // propiedad del EMS6 para concatenar
     // observable (prepara la informacion para ser leida y utilizada en otro lugar donde se pueda suscribir)
   }

   buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // Cargar los productos
      this.cargarProductos().then( () => {
        // El then es para indicar que ejecute el codigo correspondiente despues de haber resuelto la promesa (obtener los datos)
        // Aplicar el Filtro
        this.filtrarProductos(termino);
      });
    }
    // tslint:disable-next-line:one-line
    else {
      // Aplicar el filtro
      this.filtrarProductos(termino);
    }

     /*this.productosFiltrado = this.productos.filter(producto => {
       return true;
     });*/

     // console.log(this.productosFiltrado);
   }

   private filtrarProductos(termino: string) {
     this.productosFiltrado = [];
     this.productos.filter(producto => { // tambien se puede usar el forEach hace lo mismo que el filter
      const textoABuscar = producto.titulo.toLowerCase();
      if ( producto.categoria.indexOf(termino) >= 0 || textoABuscar.indexOf(termino) >= 0) {
        this.productosFiltrado.push(producto);
      }
    });
   }
}
