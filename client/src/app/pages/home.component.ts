import { Component, OnInit } from '@angular/core';
declare var $: any;

declare var jQuery: any;

import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';

import {enableProdMode} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor(private http:Http) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = this.currentUser && this.currentUser.token;
      console.log(this.currentUser);
      console.log(new Date().getTime());
      this.local = false;
      this.facebook = false;
      this.twitter = false;
      this.google = false;

      if(this.currentUser){
          this.logged=true;
      }
  }


  ngOnInit() {

    $(function(){
        $('[data-toggle="tooltip"]').tooltip();
        $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
        });
        $('.side-nav .collapse').on("show.bs.collapse", function() {                        
            $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
        });
    })    
  }

  login(e){
      console.log(e);
      e.preventDefault();
      console.log(e);
      var username = e.target.elements[0].value;
      var password = e.target.elements[1].value;

      this.http.post("http://localhost:8080/api/authenticate",{"username":username,"password":password})
          .subscribe(data=>{
              console.log(data.json().message);
              this.message = data.json().message;
              let token = data.json() && data.json().token;
              let id = data.json().id;
              console.log(data["_body"]);
              console.log(data.json().success)
              if(data.json().success){
                  if (token) {
                      this.logged = true;
                      this.token = token;   
                      this.local = false;
                      this.facebook = false;
                      this.twitter = false;
                      this.google = false;      
                      localStorage.setItem('currentUser', JSON.stringify({ id:id,username: username, token: token}));
                      localStorage.setItem('isLoggedin', 'true');
                      console.log("selam");
                      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                      this.token = this.currentUser && this.currentUser.token;
                  }else{
                      return true;
                  }
              }else{
                  return true;
              }
      })
      
  }

  register(e){
    console.log(e);
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log(username);
    console.log(password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {username:username,password:password}
    let options = new RequestOptions({headers: headers});
    this.http.post("http://localhost:8080/api/signup",body,options)
      .subscribe(response => {
        console.log(response);
        console.log(response.json().message);
        this.message = response.json().message;
      })
  }

  logout(){
    console.log("logout");
    this.logged=false;
    localStorage.removeItem("currentUser");
    console.log(JSON.parse(localStorage.getItem('currentUser')));

  }

  llogin(){
    console.log("local login");
    this.local = true;
    this.facebook = false;
    this.twitter = false;
    this.google = false;
  }

  flogin(){
    console.log("facebook login");
    this.local = false;
    this.facebook = true;
    this.twitter = false;
    this.google = false;
  }
  
  tlogin(){
    console.log("twitter login");
    this.local = false;
    this.facebook = false;
    this.twitter = true;
    this.google = false;
  }

  glogin(){
    console.log("google login");
    this.local = false;
    this.facebook = false;
    this.twitter = false;
    this.google = true;
  }
  
  tregister(){
    console.log("return register ");
    this.local = false;
    this.facebook = false;
    this.twitter = false;
    this.google = false;
    this.rregister=true;
  }

  gotoblog(){
    window.location.href = 'https://kodizim.com';
  }

  gotogithub(){
    window.location.href = 'https://github.com/mustafa05deniz/angular-4-nodejs-mysql-social';
  }
}

