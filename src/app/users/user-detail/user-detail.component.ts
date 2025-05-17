import { Component, OnInit }        from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzButtonModule }           from 'ng-zorro-antd/button';
import { UserService, User }        from '../../services/user.service';
import { switchMap }                from 'rxjs/operators';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,    
    NzButtonModule,
    NzSpinModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // читаем :id из URL и загружаем пользователя
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.userService.getUser(id);
        })
      )
      .subscribe(u => this.user = u);
  }
}
