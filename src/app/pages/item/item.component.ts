import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../interfaces/productos';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: Productos;
  id: string;

  constructor(private route: ActivatedRoute, private _servicioP: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros => { // obtener los parametros del url
      // console.log(parametros);
      console.log(parametros['id']); // hacer referencia a un parametro en especifico
      this._servicioP.getProducto(parametros['id'])
                     .subscribe( (producto: Productos) => {
                       console.log(producto);
                       this.id = parametros['id'];
                       this.producto = producto;
                     });
    });
  }

}
