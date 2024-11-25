import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { FeedComponent } from './pages/feed/feed.component';
import { DenunciasComponent } from './pages/denuncias/denuncias.component';
//import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'denuncias', component: DenunciasComponent },
  //{ path: 'perfil', component: PerfilComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
