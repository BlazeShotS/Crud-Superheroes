import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperheroe } from '../modelo/ISuperheroe';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Realiza solicitudes HTTP al backend en este caso simulacion un backend con JSON SERVER, es decir(PETICIONES AL BACKEND) y superheroes.compontent.ts Muestra datos en pantalla y gestiona esa interaccion del usuario enviando los datos al servicio según las acciones del usuario (como agregar un nuevo superhéroe o actualizar uno existente).
export class SuperheroesService {

  url = "http://localhost:3000/superheroes";


  constructor(private http: HttpClient) { }


  //Metodo get-all Productos , para obtener todo los productos
  getSuperheroes() {
    let header = new HttpHeaders().set('Type-content', 'application/json');
    return this.http.get(this.url, { headers: header });
  }


  //Metodo de insertar un Producto
  postSuperheroe(dato: ISuperheroe) {
    return this.http.post<ISuperheroe>(this.url, dato).pipe(map(
      superheroe => dato
    ));
  }


  //Metodo para editar un superheroe
  putSuperheroe(dato: ISuperheroe) {
    return this.http.put<ISuperheroe>(`${this.url}/${dato.id}`, dato).pipe(map(
      superheroe => dato
    ));
  }

  //Metodo para eliminar un superheroe
  deleteSuperheroe(id: Number) {
    return this.http.delete<ISuperheroe>(`${this.url}/${id}`).pipe(map(
      superheroe => id
    ));
  }


}
