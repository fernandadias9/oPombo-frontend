import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './pages/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmButtonComponent } from './components/confirm-button/confirm-button.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { InputComponent } from './components/input/input.component';
import { CancelButtonComponent } from './components/cancel-button/cancel-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './service/auth-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RequestInterceptor } from './auth/reques.interceptor';
import { ModalMensagemComponent } from './components/modal-mensagem/modal-mensagem.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmButtonComponent,
    CadastroUsuarioComponent,
    InputComponent,
    CancelButtonComponent,
    NavbarComponent,
    FeedComponent,
    PostCardComponent,
    ModalMensagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
