import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://127.0.0.1:8000";

  constructor(private http:HttpClient, private router: Router) { }

  //-------------------- HTTP methods for device ------------------------

  getDeviceList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/device/');
  }

  addDevice(val:any){
    return this.http.post(this.APIUrl + '/device/', val);
  }

  updateDevice(val:any){
    return this.http.put(this.APIUrl + '/device/', val);
  }

  deleteDevice(val:any){
    return this.http.delete(this.APIUrl + '/device/' + val);
  }

  //-------------------- HTTP methods for user ------------------------

  getUserList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/user/');
  }

  addUser(val:any){
    return this.http.post(this.APIUrl + '/user/', val);
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl + '/user/', val);
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl + '/user/' + val);
  }

  getAllDeviceNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/device/');
  }

  getUserDevices(val:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/user/' + val + '/device/')
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    if(token === 'admin'){
      localStorage.setItem('ROLE', token);
    }
    else if(token!==null){
      localStorage.setItem('ROLE', 'user');
      localStorage.setItem('USER_ID', token);
    }
    
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  isUserLoggedIn() {
    return this.isLoggedIn() && this.getToken() !== 'admin';
  }

  isAdminLoggedIn() {
    return this.isLoggedIn() && this.getToken() === 'admin';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('USER_ID');
    this.router.navigate(['login']);
  }

  login({ username, password }: any): Observable<any> {
    return this.http.get<any>(this.APIUrl+'/login/'+username+'/'+password);
  }
 
  getRole() {
    return localStorage.getItem('ROLE');
  }

  getUserId() {
    return localStorage.getItem('USER_ID');
  }
  
}
