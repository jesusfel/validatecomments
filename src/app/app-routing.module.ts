import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComentarioComponent } from './components/crear-comentario/crear-comentario.component';
import { ListaComentarioComponent } from './components/lista-comentario/lista-comentario.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'listacomentario', component: ListaComentarioComponent},
  {path:'crearcomentario', component: CrearComentarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
