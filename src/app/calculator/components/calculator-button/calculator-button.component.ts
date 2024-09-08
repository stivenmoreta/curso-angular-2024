import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    // attribute: 'hola',
    // 'data-size': 'XL',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  //NOTA: En este caso no aplica la clase porque, va dirigido al host y no al contenido del componente.
  //opción 1: crear la clase en el style global, no recomendado
  //opción 2: desencapsular el componente, pero eso propagaria los estilos a toda la pagina
  //opción 3: usar el ::deep pero no es recomendado por angular
  //opción 4: poner la clase en el padre y no en el hijo, no recomendado porque pierde el orden y costaria encontrar donde modificar.
  //la mejor opción es aplicar los estilos al button directamente
  //APRENDIZAJE: Recordad el orden jerarquico de los estilos de angular.
  /*  @HostBinding('class.is-command') get commandStyleI() {
      return this.isCommand();
    }*/

  //@HostBinding('class.w-2/4')
  //get commandStyle() {
  //  return this.isDoubleSize();
  //}

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return
    }
    const value = this.contentValue()!.nativeElement.innerText.trim();
    this.onClick.emit(value);
  }

  keyboardPressedStyle(key:string) {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText.trim();

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    },100);

  }

}
