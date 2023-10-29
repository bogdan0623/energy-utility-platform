import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public href: string="";
  DeviceList:any=[];

  constructor(public service:SharedService, private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    this.href = this.href.split("/", 3)[2];
    this.refreshDeviceList();
  }

  refreshDeviceList() {
    this.service.getUserDevices(this.href).subscribe(data=>{
      this.DeviceList = data;
    });
  }

}
