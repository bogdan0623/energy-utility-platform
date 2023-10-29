import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-user-devices',
  templateUrl: './user-devices.component.html',
  styleUrls: ['./user-devices.component.css']
})
export class UserDevicesComponent implements OnInit {

  @Input() user:any;
  DeviceList:any=[];

  constructor(public service:SharedService) { }

  ngOnInit(): void {
    this.refreshDeviceList();
  }

  refreshDeviceList(){
    this.service.getUserDevices(this.user.id).subscribe(data=>{
      this.DeviceList = data;
    });
  }

}
