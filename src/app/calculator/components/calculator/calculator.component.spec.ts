import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CalculatorComponent} from "@/calculator/components/calculator/calculator.component";
import {CalculatorService} from "@/calculator/services/calculator.service";
import {By} from "@angular/platform-browser";
import {CalculatorButtonComponent} from "@/calculator/components/calculator-button/calculator-button.component";

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber')
}

describe('CalculatorComponent', () => {

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers:[
        {provide: CalculatorService, useClass: MockCalculatorService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
  });

  it('should create the CalculatorComponent', () => {

    //console.log('CalculatorComponent', compiled);
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toEqual('100');
    expect(component.subResultText()).toEqual('0');
    expect(component.lastOperator()).toEqual('+');
  })

  it('should display proper calculation values',()=>{
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(component.resultText()).toEqual('123');
    expect(component.subResultText()).toEqual('456');
    expect(component.lastOperator()).toEqual('*');

  })

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toEqual(19);
  });

  it('should have 19 calculator-button with content projection', () => {
    const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );
    expect(buttonsByDirective.length).toEqual(19);

    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toEqual(19);
    expect(buttons[0].textContent?.trim()).toEqual('C');
  });

  it('should handle keyboard events', () => {
    const eventEnter = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123')

    const resultText = compiled.querySelector('#result-text');

    expect(resultText).toBeTruthy();

    expect(resultText?.textContent).toContain('10 -');

  });

});
