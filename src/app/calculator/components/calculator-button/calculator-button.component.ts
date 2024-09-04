import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'hola',
    // 'data-size': 'XL',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
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

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
}
