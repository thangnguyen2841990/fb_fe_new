import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckExist} from '../../model/check-exist';
import {PasswordCorrect} from '../../model/password-correct';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  isExitUsername = true;
  username: string;
  password: string;
  isTruePassword = true;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  usernameCheck($event) {
    this.username = $event.target.value;
    console.log(this.username);
  }

  passwordCorrectCheck($event) {
    this.password = $event.target.value;
    console.log(this.password);
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
        this.router.navigateByUrl('/home/index');
      }, error => {
        this.authService.usernameCheckExist(this.username).subscribe((usernameExist: CheckExist) => {
          this.isExitUsername = usernameExist.status;
        });
        if (this.isExitUsername) {
          this.authService.passwordCorrect(this.username, this.password).subscribe((passwordCorrect: PasswordCorrect) => {
            this.isTruePassword = passwordCorrect.status;
          });
        }
      });
    }
  }


}
