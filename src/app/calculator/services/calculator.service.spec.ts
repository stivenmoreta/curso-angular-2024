import {CalculatorService} from "@/calculator/services/calculator.service";
import {TestBed} from "@angular/core/testing";

describe('CalculatorService', () => {

  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {
    //console.log('Before all tests');
  });

  afterEach(() => {
    //console.log('After each test');
  });

  afterAll(() => {
    //console.log('After all tests');
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set, subResultText to 0 when C is pressed', () => {

    service.resultText.set('10');
    service.subResultText.set('5');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');
  })

  it('should handle operators correctly', () => {
    service.constructNumber('1')
    service.constructNumber('-')

    expect(service.lastOperator()).toBe('-')
    expect(service.subResultText()).toBe('1')
    expect(service.resultText()).toBe('0')
  })

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1')
    service.constructNumber('+')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('3')
  });

  it('should calculate result correctly for subtraction', () => {
    service.constructNumber('2')
    service.constructNumber('-')
    service.constructNumber('1')
    service.constructNumber('=')

    expect(service.resultText()).toBe('1')
  });

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('2')
    service.constructNumber('*')
    service.constructNumber('3')
    service.constructNumber('=')

    expect(service.resultText()).toBe('6')
  });

  it('should calculate result correctly for division', () => {
    service.constructNumber('6')
    service.constructNumber('0')
    service.constructNumber('/')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('30')
  });

  it('should calculate result correctly for division by zero', () => {
    service.constructNumber('6')
    service.constructNumber('/')
    service.constructNumber('0')
    service.constructNumber('=')

    expect(service.resultText()).toBe('Infinity')
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1')
    service.constructNumber('.')
    service.constructNumber('2')

    expect(service.resultText()).toBe('1.2')
    service.constructNumber('.')
    expect(service.resultText()).toBe('1.2')
  });

  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0')
    service.constructNumber('.')
    service.constructNumber('0')

    expect(service.resultText()).toBe('0.0')
    service.constructNumber('.')
    expect(service.resultText()).toBe('0.0')
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1')
    service.constructNumber('+/-')

    expect(service.resultText()).toBe('-1')
    service.constructNumber('+/-')
    expect(service.resultText()).toBe('1')
  });

  it('should handle backspace correctly', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    for(let i = 0; i<10;i++){
      service.constructNumber('1');
    }
    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });

});
