import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DeviceComponent } from './components/device/device.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '', component:AdminDashboardComponent, 
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'device', component: DeviceComponent},
      {path: 'user', component: UserComponent},
      {path: '', redirectTo: '/admin/home', pathMatch: 'full'},
    ]
  },
  {path:'**', redirectTo: '/admin/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
