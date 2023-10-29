import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faLock = faLock;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public router: Router, public auth: SharedService) { }

  LoggedUser: any = {
    id:0,
    name:"",
    username:"",
    password:"",
    is_admin:false
  };

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      if(this.auth.getToken() === 'admin') {
        this.router.navigate(['admin']);
      }
      else if(this.auth.getToken() !== null){
        this.router.navigate(['user', this.auth.getToken(), 'home']);
      }
    }
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (data)=>{
          this.LoggedUser=data;
          if (data.toString() === 'User does not exist!!'){
            alert(data.toString());
          }
          else {
            if(this.LoggedUser['is_admin'] === true) {
              this.auth.setToken("admin");
              this.router.navigate['admin'];
              console.log("AJUNG AICI");
              this.ngOnInit();
            }
            else {
              this.auth.setToken(data['id'].toString());
              this.router.navigate(['user', data['id'].toString(), 'home']);
              this.ngOnInit();
            }
          }
        }
      ); 
    }
  }
 
}
