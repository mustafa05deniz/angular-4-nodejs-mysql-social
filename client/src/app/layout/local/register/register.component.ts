import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {enableProdMode} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public token: string;
    public message:string;
    public logged:Boolean;
    public currentUser;
    constructor(public router: Router,private http:Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentUser && this.currentUser.token;
        console.log(this.currentUser);
  
        if(this.currentUser){
            this.logged=true;
        }
    }

    ngOnInit() {
        console.log("ngOnInit çalışıyor");
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
        
        this.http.post("http://localhost.com:8080/api/signup",body,options)
          .subscribe(response => {
            console.log(response);
            console.log(response.json().message);
            this.message = response.json().message;
          })
    
    
      }
    
        onLoggedin() {
            localStorage.setItem('isLoggedin', 'true');
        }

}
