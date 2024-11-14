import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
  @Input() label: string = '';
  @Input() for: string = '';
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() value: any;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onValueChange(value: any) {
    this.valueChange.emit(value);
    this.onChange(value);  // Para propagar a alteração para o formulário
  }

  // ControlValueAccessor interface methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;  // Atualiza o valor quando o formulário mudar
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;  // Registra a função para alterar o valor do controle
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;  // Registra a função para sinalizar que o controle foi tocado
  }
}
