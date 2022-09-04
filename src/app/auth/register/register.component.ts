import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regexUsername = '^A-Za-z0-9 \\S||@||\\.||_';
  submitted = false;
  username: string;
  email: string;
  phone: string;
  today: Date;
  birthDay: Date;
  isExitEmail: boolean;
  isExitUsername: boolean;
  isExitPhone: boolean;
  invalidBirthday: boolean;
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(this.regexUsername)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(0)[0-9]{9,10}')]),
    birthDay: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.authService.register(this.signUpForm.value).subscribe((userRegister) => {
        this.authService.userRegister = userRegister;
        this.signUpForm.reset();
        this.router.navigateByUrl('/auth/login');
        alert('success');
      }, error => {
        alert('Failed');
      });
    } else {
      alert('Check Validation');
    }
  }

  usernameCheck($event) {
    this.username = $event.target.value;
    console.log(this.username);
  }
}
