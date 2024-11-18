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
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './service/auth-service';
import { FormsModule } from '@angular/forms';

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
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
