import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {enableProdMode} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
        console.log(this.logged);
    }

    login(e){
        console.log(e);
        e.preventDefault();
        console.log(e);
        var username = e.target.elements[0].value;
        var password = e.target.elements[1].value;

        this.http.post("http://localhost.com:8080/api/authenticate",{"username":username,"password":password})
            .subscribe(data=>{
                console.log(data.json().message);
                this.message = data.json().message;
                let token = data.json() && data.json().token;
                let id = data.json().id;
                console.log(data["_body"]);
                console.log(data.json().success)
                if(data.json().success){
                    if (token) {
                        this.token = token;         
                        localStorage.setItem('currentUser', JSON.stringify({ id:id,username: username, token: token}));
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate(['/layout/profile']);
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
                
        })
        
    }
    
    logout() {
        console.log("onLoggedout'a geldi");
        this.logged=false;
        localStorage.removeItem("currentUser");
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        
    }

}
