// src/app/users/user-form/user-form.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { UserService, User } from '../../services/user.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule }    from 'ng-zorro-antd/form';
import { NzInputModule }   from 'ng-zorro-antd/input';
import { NzButtonModule }  from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUser', 'createUser', 'updateUser']);

    await TestBed.configureTestingModule({
      imports: [
        UserFormComponent,                         // standalone-компонент
        RouterTestingModule.withRoutes([]),        // маршрутизатор
        ReactiveFormsModule,                       // реактивные формы
        NzFormModule, NzInputModule, NzButtonModule, NzMessageModule,
        HttpClientTestingModule, NoopAnimationsModule, NzIconModule
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    mockService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with 3 controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('phone')).toBeTrue();
  });

  it('should make name control required', () => {
    const control = component.form.get('name')!;
    control.setValue('');
    expect(control.invalid).toBeTrue();
    expect(control.hasError('required')).toBeTrue();
  });

  it('should make email control required and validate email format', () => {
    const control = component.form.get('email')!;
    control.setValue('');
    expect(control.hasError('required')).toBeTrue();

    control.setValue('invalid-email');
    expect(control.hasError('email')).toBeTrue();

    control.setValue('valid@example.com');
    expect(control.valid).toBeTrue();
  });

  it('should make phone control required', () => {
    const control = component.form.get('phone')!;
    control.setValue('');
    expect(control.invalid).toBeTrue();
    expect(control.hasError('required')).toBeTrue();
  });

  it('should call createUser on submit when isEdit = false', fakeAsync(() => {
    // Arrange: задаём createUser
    const newUser: User = { id: 123, name: 'Test', email: 't@t.com', phone: '555' };
    mockService.createUser.and.returnValue(of(newUser));

    // Заполняем форму
    component.form.setValue({ name: newUser.name, email: newUser.email, phone: newUser.phone });
    component.isEdit = false;

    // Act
    component.submit();
    tick();

    // Assert
    expect(mockService.createUser).toHaveBeenCalledOnceWith({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    });
  }));

  it('should call updateUser on submit when isEdit = true', fakeAsync(() => {
    // Arrange: задаём updateUser
    const existingUser: User = { id: 99, name: 'Upd', email: 'u@u.com', phone: '777' };
    mockService.updateUser.and.returnValue(of(existingUser));

    // Заполняем форму
    component.form.setValue({ name: existingUser.name, email: existingUser.email, phone: existingUser.phone });
    component.isEdit = true;
    // @ts-ignore доступ к приватному userId для теста
    component.userId = existingUser.id;

    // Act
    component.submit();
    tick();

    // Assert
    expect(mockService.updateUser).toHaveBeenCalledOnceWith(existingUser.id!, {
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone
    });
  }));

  it('should not call service if form is invalid', fakeAsync(() => {
    // Arrange: делаем форму невалидной
    component.form.setValue({ name: '', email: 'bad', phone: '' });
    component.isEdit = false;

    // Act
    component.submit();
    tick();

    // Assert
    expect(mockService.createUser).not.toHaveBeenCalled();
    expect(mockService.updateUser).not.toHaveBeenCalled();
  }));
  it('should call createUser on submit when isEdit = false', fakeAsync(() => {
    component.isEdit = false;
  
    const mockUser = { name: 'John', email: 'john@example.com', phone: '123456' };
    component.form.setValue(mockUser);
  
    const spy = mockService.createUser.and.returnValue(of({ ...mockUser, id: 1 }));
  
    fixture.detectChanges();
    component.submit();
    tick();
  
    expect(spy).toHaveBeenCalledWith(mockUser);
  }));
  it('should call updateUser on submit when isEdit = true', fakeAsync(() => {
    const userId = 5;
    component.isEdit = true;
    component.userId = userId;
  
    const mockUser = { name: 'Jane', email: 'jane@example.com', phone: '987654' };
    component.form.setValue(mockUser);
  
    const spy = mockService.updateUser.and.returnValue(of({ ...mockUser, id: userId }));
  
    fixture.detectChanges();
    component.submit();
    tick();
  
    expect(spy).toHaveBeenCalledWith(userId, mockUser);
  }));
    
});
