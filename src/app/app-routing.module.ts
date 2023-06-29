import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'datos-usuario/:respuesta', component: DatosUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
