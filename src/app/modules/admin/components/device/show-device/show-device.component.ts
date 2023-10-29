import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css']
})
export class ShowDeviceComponent implements OnInit {

  constructor(public service:SharedService) { }

  DeviceList:any=[];

  ModalTitle:string | undefined;
  ActivateAddEditDeviceComp:boolean=false;
  device:any;

  ngOnInit(): void {
    this.refreshDeviceList();
  }

  addClick(){
    this.device={
      id:0,
      description:"",
      address:"",
      max_cons_per_hour:0,
      user:0
    }
    this.ModalTitle="Add Device";
    this.ActivateAddEditDeviceComp=true;
  }

  closeClick(){
    this.ActivateAddEditDeviceComp=false;
    this.refreshDeviceList();
  }

  editClick(item){
    this.device=item;
    this.ModalTitle="Update Device";
    this.ActivateAddEditDeviceComp=true;
  }

  deleteClick(item){
    if(confirm("Are you sure?")){
      this.service.deleteDevice(item.id).subscribe(data=>{
        alert(data.toString());
        this.refreshDeviceList();
      })
    }
  }

  refreshDeviceList(){
    this.service.getDeviceList().subscribe(data=>{
      this.DeviceList=data;
    });
  }

}
