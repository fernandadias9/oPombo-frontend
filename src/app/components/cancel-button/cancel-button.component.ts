import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.scss'
})
export class CancelButtonComponent {
  @Input() label: string = 'Cancelar';
}
