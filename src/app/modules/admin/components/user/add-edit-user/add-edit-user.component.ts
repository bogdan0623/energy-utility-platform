import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(public service:SharedService) { }

  @Input() user:any;
  id:bigint | undefined;
  name:string | undefined;
  username:string | undefined;
  password:string | undefined;
  is_admin:boolean | undefined;

  ngOnInit(): void {
    this.id = this.user.id;
    this.name = this.user.name;
    this.username = this.user.username;
    this.password = this.user.password;
    this.is_admin = this.user.is_admin;
  }

  addUser(){
    var val = {
      id:this.id,
      name:this.name,
      username:this.username,
      password:this.password,
      is_admin:this.is_admin
    };
    this.service.addUser(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateUser(){
    var val = {
      id:this.id,
      name:this.name,
      username:this.username,
      password:this.password,
      is_admin:this.is_admin
    };
    this.service.updateUser(val).subscribe(res=>{
      alert(res.toString());
    });
  }

}
