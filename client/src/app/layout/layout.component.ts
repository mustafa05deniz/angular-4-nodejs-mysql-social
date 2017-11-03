import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule,Headers, Response, RequestOptions,URLSearchParams} from '@angular/http';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    public token: string;
    public currentuser;
    constructor(public router: Router,private http:Http) { 
        this.currentuser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.currentuser && this.currentuser.token;
        console.log("currentUser");
        console.log(this.currentuser);
    }

    ngOnInit() {
        console.log("layout component is running ");
        
    }

}
