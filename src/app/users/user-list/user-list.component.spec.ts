// src/app/users/user-list/user-list.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockService: jasmine.SpyObj<UserService>;

  const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', phone: '111' },
    { id: 2, name: 'Bob', email: 'bob@example.com', phone: '222' }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockService.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        RouterTestingModule,
        FormsModule,
        NzTableModule,
        NzPaginationModule,
        NzInputModule,
        NoopAnimationsModule,
        NzIconModule,
      ],
      providers: [
        { provide: UserService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // запускает ngOnInit
  });

  it('should render list', fakeAsync(() => {
    tick(); // ждём данных из observable
    fixture.detectChanges(); // обновляем DOM

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockUsers.length);
    expect(rows[0].nativeElement.textContent).toContain('Alice');
    expect(rows[1].nativeElement.textContent).toContain('Bob');
  }));
});
