// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';  // <-- нужна заглушка маршрутизатора
import { provideHttpClient } from '@angular/common/http';        // не нужен, если нет HttpClient в AppComponent

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,                  // standalone
        RouterTestingModule.withRoutes([])  // <-- импортируем
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'user-management-app'`, () => {
    expect(comp.title).toEqual('user-management-app');
  });
});
