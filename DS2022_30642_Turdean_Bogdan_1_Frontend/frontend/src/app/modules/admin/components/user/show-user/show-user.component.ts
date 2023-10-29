import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(public service:SharedService) { }

  UserList:any=[];
  DeviceList:any=[];

  ModalTitle:string | undefined;
  ActivateAddEditUserComp:boolean=false;
  ActivateUserDevicesComp:boolean=false;
  user:any;

  ngOnInit(): void {
    this.refreshUserList();
  }

  addClick(){
    this.user={
      id:0,
      name:"",
      username:"",
      password:"",
      is_admin:false
    }
    this.ModalTitle="Add User";
    this.ActivateAddEditUserComp=true;
  }

  closeClick(){
    this.ActivateAddEditUserComp=false;
    this.ActivateUserDevicesComp=false;
    this.refreshUserList();
  }

  editClick(item){
    this.user=item;
    this.ModalTitle="Update User";
    this.ActivateAddEditUserComp=true;
  }

  deleteClick(item){
    if(confirm("Are you sure?")){
      this.service.deleteUser(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshUserList();
      })
    }
  }

  refreshUserList(){
    this.service.getUserList().subscribe(data=>{
      this.UserList=data;
    });
  }

  showDevicesClick(item){
    // this.service.getUserDevices(item.id).subscribe(data=>{
    //   this.DeviceList = data;
    // });
    this.user = item;
    this.ModalTitle="Your Devices";
    this.ActivateUserDevicesComp=true;
  }

}
