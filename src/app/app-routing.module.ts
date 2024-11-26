import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { FeedComponent } from './pages/feed/feed.component';
import { DenunciasComponent } from './pages/denuncias/denuncias.component';
import { DenunciaDetalheComponent } from './pages/denuncia-detalhe/denuncia-detalhe.component';
import { SemPermissaoComponent } from './pages/sem-permissao/sem-permissao.component';
import { AuthGuard } from './guards/auth.guard';
//import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'denuncias', component: DenunciasComponent, canActivate: [AuthGuard] },
  { path: 'denuncias/:id', component: DenunciaDetalheComponent, canActivate: [AuthGuard] },
  { path: 'sem-permissao', component: SemPermissaoComponent },
  //{ path: 'perfil', component: PerfilComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
