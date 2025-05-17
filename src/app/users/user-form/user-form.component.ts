import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,   
    NzButtonModule,
    NzMessageModule,
    NzSpinModule
  ],
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  userId?: number;
  isEdit = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.userId = +id;
        this.userService.getUser(this.userId).subscribe(u => this.form.patchValue(u));
        this.isLoading = false;
      } else{
        this.isLoading = false;
      }
      }
    );
  }

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsDirty());
      return;
    }
    const data: User = this.form.value;
    const obs = this.isEdit
      ? this.userService.updateUser(this.userId!, data)
      : this.userService.createUser(data);

    obs.subscribe(() => {
      this.msg.success(this.isEdit ? 'Обновлено' : 'Создано');
      this.router.navigate(['/users']);
    });
  }

  public cancel(): void {
    this.router.navigate(['/users']);
  }
}
