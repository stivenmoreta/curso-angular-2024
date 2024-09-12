import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should be 15", ()=>{
    const num1 = 10;
    const num2 = 5;

    const result = num1 + num2;
    expect(result).toBe(15);
  })

  it(`should have the 'zoneless-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'
      .split(' ');

    expect(divElement).not.toBeNull();

/*    divElement?.classList.forEach(className => {
      expect(mustHaveClasses).toContain(className);
    });*/
    const divClasses = divElement?.classList.value.split(' ');

    mustHaveClasses.forEach(mustHaveClass => {
      expect(divClasses).toContain(mustHaveClass);
    });

  });


  it("should contain the 'buy me a beer' link", () => {
    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');
    expect(anchorElement?.href).toBe('https://www.buymeacoffee.com/scottwindon');
    expect (anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
  });
});
