import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SharedService } from './shared.service';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin', 
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    },
    loadChildren: () => 
    import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user', 
    canActivate: [AuthGuard],
    data: {
      role: 'user'
    },
    loadChildren: () => 
    import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
