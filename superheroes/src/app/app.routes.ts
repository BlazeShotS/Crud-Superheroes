import { Routes } from '@angular/router';
import { InicioComponent } from './comp/inicio/inicio.component';
import { InformacionComponent } from './comp/informacion/informacion.component';
import { SuperheroesComponent } from './comp/superheroes/superheroes.component';
import { NotFoundComponent } from './comp/not-found/not-found.component';

export const routes: Routes = [

    {path: "inicio", component:InicioComponent, title:"Bienvenido"},
    {path: "", redirectTo:"inicio",pathMatch:"full"},
    {path: "informacion", component:InformacionComponent, title:"Info Superheroes"},
    {path: "superheroes", component:SuperheroesComponent, title:"Superheroes"},
    {path: "**", component:NotFoundComponent,title:"Not Found"}

];
