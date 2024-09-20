import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculatorButtonComponent} from "@/calculator/components/calculator-button/calculator-button.component";
import {Component} from "@angular/core";

@Component({
  standalone:true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span id="test-value-projected">1</span>
    </calculator-button>
  `
})
class TestSuperiorComponent {
}


describe('CalculatorButtonComponent', () => {

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the calculator button component', () => {
    //console.log(compiled)
    expect(component).toBeTruthy();
  });

  it('should default apply w-1/4 class css', () => {
    const classList = compiled.classList.value.split(" ");
    expect(classList).toContain('w-1/4');
    //expect(component.isDoubleSize).toBeFalse();
  });

  it('should apply w-2/4 double size class css', () => {
    //ingresando un valor a un input componente tipo signal
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const classList = compiled.classList.value.split(" ");
    expect(classList).toContain('w-2/4');
  });


  it('should emit onClick when handleClick is called', () => {
    //espias
    spyOn(component.onClick,'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true when keyboardPressedStyle is called', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 1001);
  })

  it('should projected html elements in calculator button', () => {

    const testSuperiorComponent = TestBed.createComponent(TestSuperiorComponent);

    const compiled = testSuperiorComponent.nativeElement as HTMLDivElement;
    const span = compiled.querySelector('span#test-value-projected');

    expect(span).toBeTruthy();
  });


});
