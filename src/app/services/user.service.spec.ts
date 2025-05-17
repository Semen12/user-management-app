import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule   // <-- обязательно
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch users (GET)', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice', email: 'a@a.com', phone: '111' },
      { id: 2, name: 'Bob',   email: 'b@b.com', phone: '222' }
    ];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch single user by ID (GET)', () => {
    const mockUser: User = { id: 42, name: 'X', email: 'x@x.com', phone: '999' };

    service.getUser(42).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/42`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a user (POST)', () => {
    const newUser: User = { name: 'New', email: 'n@n.com', phone: '333' };
    const createdUser: User = { id: 3, ...newUser };

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(createdUser);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(createdUser);
  });

  it('should update a user (PUT)', () => {
    const update: User = { id: 1, name: 'Upd', email: 'u@u.com', phone: '444' };

    service.updateUser(1, update).subscribe(user => {
      expect(user).toEqual(update);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(update);
    req.flush(update);
  });

  it('should delete a user (DELETE)', () => {
    service.deleteUser(5).subscribe(resp => {
      expect(resp).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should delete a user (DELETE)', fakeAsync(() => {
    const mockId = 1;
  
    const http = TestBed.inject(HttpTestingController);
    let result: any;
  
    service.deleteUser(mockId).subscribe(res => result = res);
    const req = http.expectOne(`/api/users/${mockId}`);
  
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // simulate server response
  
    tick();
    expect(result).toBeNull(); // корректно ожидаем null
  }));
  
});
