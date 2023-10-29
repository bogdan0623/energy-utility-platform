import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './modules/admin/components/device/device.component';
import { ShowDeviceComponent } from './modules/admin/components/device/show-device/show-device.component';
import { AddEditDeviceComponent } from './modules/admin/components/device/add-edit-device/add-edit-device.component';
import { UserComponent } from './modules/admin/components/user/user.component';
import { ShowUserComponent } from './modules/admin/components/user/show-user/show-user.component';
import { AddEditUserComponent } from './modules/admin/components/user/add-edit-user/add-edit-user.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDevicesComponent } from './modules/admin/components/user/user-devices/user-devices.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components//forgot-password/forgot-password.component';
import { NotFoundComponent } from './components//not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ShowDeviceComponent,
    AddEditDeviceComponent,
    UserComponent,
    ShowUserComponent,
    AddEditUserComponent,
    UserDevicesComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
