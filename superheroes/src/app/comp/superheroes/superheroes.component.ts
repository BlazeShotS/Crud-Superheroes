import { Component, OnInit } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { ISuperheroe } from '../../modelo/ISuperheroe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Superheroe } from '../../modelo/Superheroe';

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './superheroes.component.html',
  styleUrl: './superheroes.component.css'
})
//Muestra los datos en pantalla
export class SuperheroesComponent implements OnInit {
  
  
   //Texto para el botón del formulario
   textoBtn = "Agregar";
   //Variable auxiliar para hacer Insert o Update
   // T -> Insert 
   // F -> Update
   insUpd = true;
 


  
  //Constructor
   constructor(private service: SuperheroesService) { }

   //Lista de Productos
  superheroes: ISuperheroe[] = [];



  ngOnInit(): void {
    this.getSuperheroe();
  }


  //Función que muestra todos los superheroes en mi navegador
  getSuperheroe() {
    this.service.getSuperheroes().subscribe(
      (resp: any) => this.superheroes = resp
    );
  }





  
    // AGREGAR Y/O EDITAR superheroe
    superhe: Superheroe = new Superheroe();

    //Formulario INICIALIZO TODO LO DE MI HTML
    formSuperheroes = new FormGroup({
      nombre: new FormControl(),
      nombrereal: new FormControl(),
      poderes: new FormControl(),
      afiliacion: new FormControl(),
      url: new FormControl()
    })


    procesar() {
      this.superhe.nombre = this.formSuperheroes.value.nombre;    
      this.superhe.nombre_real = this.formSuperheroes.value.nombrereal;
      this.superhe.poderes = this.formSuperheroes.value.poderes;
      this.superhe.afiliacion = this.formSuperheroes.value.afiliacion;
      this.superhe.url_imagen= this.formSuperheroes.value.url;


      if (this.insUpd) {
        // True - Inserción
        this.service.postSuperheroe(this.superhe).subscribe( //EN ACA ESTAMOS INSERTANDO 
          (resp: any) => {
            this.getSuperheroe();          // Actualiza la lista de productos y lo muestra en el navegador    
            this.formSuperheroes.reset();   // limpia el formulario
          });
      } else {
        // False - Actualización
        this.service.putSuperheroe(this.superhe).subscribe(
          (resp: any) => {
            this.getSuperheroe();          // Actualiza la lista de productos y lo muestra en el navegador    
            this.formSuperheroes.reset();   // limpia el formulario
            this.textoBtn = "Agregar";  // cambia el texto
            this.insUpd = true;         // cambia la opción a insert
            this.superhe = new Superheroe();   // limpia el objeto
          });
      }
    }


    
  editar = (a: ISuperheroe) => {
    //Cargar el producto al formulario
    this.superhe.id = a.id;
    this.formSuperheroes.controls['nombre'].setValue(a.nombre);
    this.formSuperheroes.controls['nombrereal'].setValue(a.nombre_real);
    this.formSuperheroes.controls['poderes'].setValue(a.poderes);
    this.formSuperheroes.controls['afiliacion'].setValue(a.afiliacion);
    this.formSuperheroes.controls['url'].setValue(a.url_imagen);

    //Activar la actualización
    this.textoBtn = "Actualizar";
    this.insUpd = false;
  }


  eliminar = (a: ISuperheroe) => {
    let confirm = window.confirm(`Deseas eliminar a ${a.nombre}`);
    if (confirm) {
      this.service.deleteSuperheroe(a.id!).subscribe(
        (resp: any) => {
          this.getSuperheroe();          // Actualiza la lista de productos y lo muestra en el navegador       
        });
    }
  }




}
