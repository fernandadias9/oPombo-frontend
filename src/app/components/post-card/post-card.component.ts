import { Mensagem } from './../../model/entities/mensagem';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() mensagem!: Mensagem;
}
