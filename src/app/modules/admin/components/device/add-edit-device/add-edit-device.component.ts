import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  constructor(public service:SharedService) { }

  @Input() device:any;
  id:bigint | undefined;
  description:string | undefined;
  address:string | undefined; 
  max_cons_per_hour:bigint | undefined;
  user:bigint | undefined;

  ngOnInit(): void {
    this.id = this.device.id;
    this.description = this.device.description;
    this.address = this.device.address;
    this.max_cons_per_hour = this.device.max_cons_per_hour;
    this.user = this.device.user;
  }

  addDevice(){
    var val = {
      id:this.id,
      description:this.description,
      address:this.address,
      max_cons_per_hour:this.max_cons_per_hour,
      user:this.user
    };
    this.service.addDevice(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDevice(){
    var val = {
      id:this.id,
      description:this.description,
      address:this.address,
      max_cons_per_hour:this.max_cons_per_hour,
      user:this.user
    };
    this.service.updateDevice(val).subscribe(res=>{
      alert(res.toString());
    });
  }

}
