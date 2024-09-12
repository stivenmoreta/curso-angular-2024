import {ComponentFixture, TestBed} from '@angular/core/testing';

import CalculatorViewComponent from "@/calculator/views/calculator-view/calculator-view.component";

describe('CalculatorViewComponent', () => {

  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    const calculatorComponent = compiled.querySelector('calculator');
    expect(calculatorComponent).toBeTruthy();
  });

  it('should css class be calculator-view', () => {
    const css = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
    const div = compiled.querySelector('div');
    css.forEach(c => expect(div?.className).toContain(c));
  })

});
