import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Http,HttpModule,Headers, Response, RequestOptions,URLSearchParams} from '@angular/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    pushRightClass: string = 'push-right';
    public token: string;
    products : any = [];
    public username : string;
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
        console.log(this.logged);
        console.log("header component is running");
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
    

    logout() {
        console.log("onLoggedout'a geldi");
        this.logged=false;
        localStorage.removeItem("currentUser");
        console.log(JSON.parse(localStorage.getItem('currentUser')));
        
    }



    
}
