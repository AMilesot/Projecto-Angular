import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, public _servicioP: ProductosService) // Para geationar los parametros de la url
  // tslint:disable-next-line:one-line
  { }

  ngOnInit() {

    this.route.params.subscribe( parametros => {
      this._servicioP.buscarProducto(parametros['termino']);
      // console.log(parametros['termino']);
    });
  }

}
