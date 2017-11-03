import { Component, OnInit } from '@angular/core';
declare var $: any;

declare var jQuery: any;

import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';

import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public token: string;
  public message:string;
  public logged:Boolean;
  public registerd:Boolean;
  public currentUser;
  public twitter:Boolean;
  public facebook:Boolean;
  public local:Boolean;
  public google:Boolean;
  public rregister:Boolean;

  public users = [];

  constructor(private http:Http) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
      console.log(this.currentUser);
      this.getProfile();
      this.logged=false;
      if(this.currentUser){
        this.logged=true;
    }
  }


  ngOnInit() {

    console.log("this.logged : "+this.logged);
  }

  getProfile(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', this.token);
    let options = new RequestOptions({headers: headers});
    this.http.get("http://localhost.com:8080/api/profile",options)
        .subscribe(response =>{
          console.log(response.json())
          console.log("selam");
          this.users = response.json();
          console.log(this.users)         
        })
    
  }
  logout() {
    console.log("onLoggedout'a geldi");
    this.logged=false;
    localStorage.removeItem("currentUser");
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    
}
  

}

