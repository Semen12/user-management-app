import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzInputModule,
    NzTableModule,
    NzPaginationModule,
    NzIconModule,
    NzPopconfirmModule,
    NzButtonModule,
    
   
  ],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchValue = '';
  pageSize = 5;
  pageIndex = 1;

  constructor(private userService: UserService,  private msg: NzMessageService ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((list) => {
      this.users = list;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const val = this.searchValue.trim().toLowerCase();
    this.filteredUsers = this.users.filter(
      (u) =>
        u.name.toLowerCase().includes(val) ||
        u.email.toLowerCase().includes(val)
    );
    this.pageIndex = 1;
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
  }

  deleteUser(id?: number): void {
    if (!id) { return; }
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.msg.success(`Пользователь ${id} удалён`);
        // обновляем список
        this.users = this.users.filter(u => u.id !== id);
        this.applyFilter();
      },
      error: () => {
        this.msg.error(`Ошибка при удалении пользователя ${id}`);
      }
    });
  }
}
