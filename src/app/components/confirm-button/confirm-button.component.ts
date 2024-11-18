import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrl: './confirm-button.component.scss'
})
export class ConfirmButtonComponent {
  @Input() label: string = 'Confirmar';
}
