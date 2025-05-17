// src/app/users/user-detail/user-detail.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService, User }   from '../../services/user.service';
import { of }                  from 'rxjs';
import { ActivatedRoute }      from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule }        from '@angular/common';
import { NzButtonModule }      from 'ng-zorro-antd/button';
import { NzSpinModule }        from 'ng-zorro-antd/spin';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture:   ComponentFixture<UserDetailComponent>;
  let mockService: jasmine.SpyObj<UserService>;

  // id здесь обязательно задан, поэтому используем "!"
  const DUMMY_USER: User = {
    id: 42,
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-4567'
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('UserService', ['getUser']);
    mockService.getUser.and.returnValue(of(DUMMY_USER));

    await TestBed.configureTestingModule({
      imports: [
        UserDetailComponent,
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule,
        CommonModule,
        NzButtonModule,
        NzSpinModule
      ],
      providers: [
        { provide: UserService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            // Здесь явно утверждаем, что id не undefined
            paramMap: of(new Map<string, string>([['id', DUMMY_USER.id!.toString()]]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user on init', fakeAsync(() => {
    fixture.detectChanges(); // запускает ngOnInit
    tick();

    // Проверяем, что getUser вызван
    expect(mockService.getUser).toHaveBeenCalled();

    // Извлекаем фактический аргумент
    const idArg = mockService.getUser.calls.mostRecent().args[0] as number;
    // Сравниваем с не-null-утверждённым id
    expect(idArg).toBe(DUMMY_USER.id!);
  }));
});
